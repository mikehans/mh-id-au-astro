---
slug: 'redis-caching-proxy'
date: "2024-07-14"
title: "A C# caching proxy implementation for Redis and Cosmos DB"
description: "Loud complaints of an old man yelling at the clouds about lousy caching implementations with Redis and (insert your DB here)."
author: "Mike Hansford"
imageUrl: "/img/azure-kingfisher2.jpg"
type: "post"
publish: true
tags:
    - Azure
    - C#
    - .NET
    - Cosmos DB
    - Redis
    - design patterns
---
# A C# caching proxy implementation for Redis and Cosmos DB
## So what's my beef here?
Over and over again, I see demos / doco showing how easy it is to add a cache in front of a database. The code to add the cache is just thrown directly onto the methods accessing / writing the data. It seems we've forgotton or thrown out the idea of design patterns, like they are a waste of time or something. Or perhaps, they're only demos, so certain things don't matter. Demos become the documentation and get implemented because there are devs who simply don't know any better. (Insert old man yelling at the clouds). So in the interests of keeping my head-banging for heavy metal, I've written my own demo.

## Proxy pattern intent
The intent of the Proxy pattern is to create a surrogate that controls access to another object. Wow, that sounds a lot like what I want to do here. Specifically, I want a cache that intercepts database access and tries to fulfil any data requests from the cache first. If the data I want is there I'll return that. Otherwise I'll send the request on to the database and cache that data on the way back out.

## Implementation
I've put the project for this article here: https://github.com/mikehans/AzureCosmosRedisCaching

### IStorage interface and implementors
#### IStorage interface
All storage classes inherit from ```AzureCosmosCaching.Storage.IStorage```. In my simplistic demo, I only have a method for read and a method for write. You'd need to implement more appropriate methods for your use case.

#### Implementor: CosmosStorage
This class is wholly responsible for reading to and writing from Cosmos DB. Note there is absolutely no caching concerns here. This is as it should be - this class has one responsibility only. The constructor, which isn't part of the interface, only takes the application configuration.

#### Implementor: RedisStorage
This class is a bit more complex. It implements ```IStorage``` but the constructor takes an ```IStorage``` object being the data store that is being proxied. The ```IConnectionMultiplexer``` and the ```int ttlSeconds``` parameters are Redis specific. The proxy only needs to know there is this thing that it is proxying. It doesn't know that it is Cosmos DB, only that it conforms to the ```IStorage``` interface.

Let's take the ```Read()``` method. We try to get the key from Redis. If it finds the key, whatever value is stored there is returned. Otherwise it calls to the proxied storage, caches the returning result (assuming there is one) and returns the result. There are two cases where the item may not be found in the cache: when the result has not yet been cached and when the Time-To-Live (a function of Redis) has expired and the item has been removed from the cache.

For the ```Write()``` method, we want to delete the key from Redis and write the new product to Cosmos.

## Discussion
Obviously, this is a pretty simple demo. It's also inflexible - I hard-coded the Redis key meaning that in its current state it can't be re-used for a different piece of data. In a real app I'd want to parameterise the Redis key so I can use it for other data. Such is life with demoware.

For this demo I chose Redis and Cosmos DB simply because I wanted some practise with them. 

When considering what you're going to use as your cache, think about what attributes you want your cache to have. For example:
* how can latency between the cache and where it is needed (ie. your application) be minimised
    * it's probably counter-productive if you have your DB in Germany, your cache in the USA and your application in Australia...
* does the cache need to be shared among many application instances?
    * eg. if there is only one web server, an in-momory cache could be viable but if there are many web servers a shared cache is needed
* how big does your cache need to be?
* how big could it become?
* how aggressively do you need to be in clearing stale items?
    * your cloud provider will happily bill you a small fortune as long as you keep stuffing your stuff into your (their?) cache

### Benefits
Hopefully, the clear benefit is that the Redis concerns are completely separate from the Cosmos DB concerns. Each are confined to their own classes. Changing them is going to be significantly simpler. If I build it a little more completely, I could have:
* consistent access 
* the potential for reading and writing any key
* writing different data types 
* setting time-to-live per key
* consistent logging and monitoring

### Limitations
The glaring problem with this demo is in how I configured my dependency injection container in ```Program.cs```. 
```csharp
    var configuration = new ConfigurationBuilder();
    configuration.AddJsonFile("appsettings.Development.json");
    var configurationRoot = configuration.Build();

    var tryParseOk = int.TryParse(configurationRoot["RedisTTLSeconds"], out var result);

    var ttlSeconds = tryParseOk ? result : 17;
    var hostBuilder = Host.CreateDefaultBuilder(args).ConfigureServices(
        services =>
        {
            if (configurationRoot["CacheEnabled"] == "yes")
            {
                var proxiedStorage = new CosmosStorage(configurationRoot);

                var redisCacheString = configurationRoot["RedisCache"]
                                    ?? throw new Exception("No Redis Cache connection string.");

                services.AddSingleton<IStorage>(
                    s => new RedisStorage(
                        ConnectionMultiplexer.Connect(redisCacheString),
                        proxiedStorage,
                        ttlSeconds
                    )
                );
            }
            else
            {
                services.AddSingleton<IStorage>(
                    s => new CosmosStorage(configurationRoot)
                );
            }
        });

```

Here I've used Microsoft's built-in DI container from ```Microsoft.Extensions.DependencyInjection```. Configuring the container happens inside ```Host.CreateDefaultBuilder(args).ConfigureServices()```. You can see the problem I had injecting several classes that implement the same interface (extracted here for clarity).
```csharp
    services.AddSingleton<IStorage>(
        s => new RedisStorage(
            ConnectionMultiplexer.Connect(redisCacheString),
            proxiedStorage,
            ttlSeconds
        )
    );
```
This container doesn't provide a means for selecting which implementation to use for a given case. While the Microsoft doco says to just change your design, I don't want to. Some other dependency injection containers support named or keyed dependencies (Autofac), which I think will let me inject the ```CosmosStorage``` class into the ```RedisStorage``` class and then register ```RedisStorage``` as the class I get when I request an ```IStorage``` service from the DI container. 

_EDIT: Keyed dependencies have been added in .NET 8._

### Other applications
A simple architecture if you're hosting the application yourself on your own web server would be to have a PostgreSQL database with an in-memory cache on the web server itself.

Alternatively, I could have had perhaps a product catalogue in a SQL database and used Cosmos DB as the caching proxy, using its own time-to-live capabilities to cache the SQL database. ~~One benefit of shifting the data storage type here is that the data schema could be changed to better suit to the application's use case - perhaps extracting the featured products from SQL and storing them as JSON on a single key, already processed and ready for use.~~
_EDIT (25 Jul 2024): Since writing this, I have become increasingly uncomfortable with it. Changing the data schema here would have negative consequences. Specifically, the data that comes out of every ```IStorage``` implementation needs to be identical. This is so that if the proxy were removed from the dependency injection configuration the program would continue to work without further changes. More correctly, the way you store the data would change according to the storage type but the shape of the data being returned to the application needs to be the same in every instance._

## Wrap up
Proxies are pretty useful and really easy to implement in C#. They present many benefits as discussed and should be considered for use when caching is required. The Proxy design pattern discusses several other uses including remote proxies and deferred proxies (though I think they use a different term here). This article has not considered their utility.
