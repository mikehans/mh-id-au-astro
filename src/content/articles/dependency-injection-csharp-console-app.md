---
  title: "Dependency Injection Setup for .NET Console Application"
  slug: "dependency-injection-csharp-console-app"
  date: "2023-04-09"
  description: "A barebones setup for configuring the default dependency injection container in a C# console app."
  author: "Mike Hansford"
  type: "post"
  tags:
    - C#
    - Dependency Injection
---
This post describes the foundational steps to configure the Microsoft dependency injection container for a C# console application.

## Nuget
Once you have a basic console application, you need to install the following Nuget packages:
* Microsoft.Extensions.Hosting
* Microsoft.Extensions.DependencyInjection

## Setting up the Host
The following code is the barest basics for configuring the ```Microsoft.Extensions.Hosting.Host```.

```csharp
  using Microsoft.Extensions.DependencyInjection;
  using Microsoft.Extensions.Hosting;
  
  IHost host = Host.CreateDefaultBuilder(args)
    .Build();

  // do stuff

  await host.RunAsync();
```
The ```Host``` static class has a single method ```CreateDefaultBuilder```. 

The ```CreateDefaultBuilder``` method is interesting as it does a lot of really helpful stuff for us. Per the [documentation](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.hosting.host.createdefaultbuilder), it:
*    Sets the ContentRootPath to the result of GetCurrentDirectory().
*    Loads host IConfiguration from "DOTNET_" prefixed environment variables.
*    Loads app IConfiguration from 'appsettings.json' and 'appsettings.[EnvironmentName].json'.
*    Loads app IConfiguration from User Secrets when EnvironmentName is 'Development' using the entry assembly.
*    Loads app IConfiguration from environment variables.
*    Configures the ILoggerFactory to log to the console, debug, and event source output.
*    Enables scope validation on the dependency injection container when EnvironmentName is 'Development'.

That's a lot of useful stuff that we don't have to do by hand. It means we can do things like:
* store and retrieve configuration from many sources, including appsettings.json and any of the environment-specific variants (eg. appsettings.Development.json)
* provide configuration via the command line that will over-ride an equivalent configuration item stored in appsettings.json
* start adding services into the dependency injection container

Finally, we need to call ```Build()```. Without this, we will create an instance of ```IHostBuilder```. ```Build()``` belongs to the ```IHostBuilder``` interface and we use it to create an instance of ```IHost```. 

### Documentation
Microsoft provides documentation for the dependency injection container [here](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection).

## Injecting services
From here, things are pretty much identical to configuring the DI container in a WebAPI app. 

Chaining on the ```ConfigureServices()``` method allows you to configure the dependency injection container. In the sample below, I am injecting two services.
* ```services.AddSingleton<IDataAccess, DataAccess>();```
  * This is setting up a singleton for the ```IDataAccess``` contract to resolve to the ```DataAccess``` type.
* ```services.AddSingleton<DataAccess.CreateDbConnection>((serviceProvider) =>{});```
  * This one is a little bit interesting. ```DataAccess.CreateDbConnection``` is a delegate type. In the code contained inside the parens, I am configuring the ```IDbConnection``` type that Dapper is using depending on the value in the ```ASPNET_ENVIRONMENT``` environment variable.
  * I found [this blog post from Christian Findlay](https://www.christianfindlay.com/blog/c-delegates-with-ioc-containers-and-dependency-injection) helpful in building my understanding of this.

```csharp
  var host = Host.CreateDefaultBuilder(args).ConfigureServices(
      services =>
      {
          services.AddSingleton<IDataAccess, DataAccess>();
          services.AddSingleton<DataAccess.CreateDbConnection>((serviceProvider) =>
          {
              var config = serviceProvider.GetRequiredService<IConfiguration>();
              var aspnetEnvironment = config.GetSection("ASPNET_ENVIRONMENT").Value;
              Console.WriteLine($"ASPNET_ENVIRONMENT: {aspnetEnvironment}");

              return aspnetEnvironment switch
              {
                  "Development" => SqlConnectionProvider.CreateDbConnection,
                  "Test" => SqliteConnectionProvider.CreateInMemoryDbConnection,
                  _ => SqliteConnectionProvider.CreateDbConnection
              };
          });
      }
  ).Build();

```

## Want to see it in use?
I have created a sample console application that is using the Microsoft dependency injection container. [Here](https://github.com/mikehans/TodoList-sql2/blob/master/TodoList-SQL2/Program.cs) is the direct link to the Program.cs file.

This demo application uses Dapper to access a database. There are a couple of issues right now relating to the creation of the in memory SQLite DB but otherwise it illustrates of using Dapper and configuring the database connection using dependency injection.