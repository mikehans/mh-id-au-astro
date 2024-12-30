---
slug: 'cosmos-db-sdk-exercises'
date: "2022-04-21"
title: "Azure Cosmos DB with .NET SDK"
description: "Discusses lessons learned while training with Cosmos DB for AZ-204"
imageUrl: "/img/blueoptic.jpg"
author: "Mike Hansford"
type: "post"
publish: true
tags:
    - Azure
    - AZ-204
    - Cosmos DB
    - certification
---
## Azure Cosmos DB with .NET SDK
Cosmos DB is one of the topics for the AZ-204 domain "Develop for Azure Storage". This article unpacks some of the lessons from exploring the scope of this requirement with respect to the SDK. 

As of the time of writing, I am yet to attempt the exam. The current version of the exam is the April 2023 update.

### Core SDK classes
The following classes appear to be the key classes to understand:
* ```CosmosClient```
    * ```CosmosClientOptions```
* ```Database```
* ```Container```
* ```QueryDefinition```
* ```FeedIterator<T>```

The exam readiness videos repeatedly state that this is not a syntax exam. So, there's no need to recall in perfect detail every nuance of these classes. However, it is important to understand the relationships between the key classes, what they do and the key methods and properties of them.

To assist in understanding these classes, I completed a [a set of C# exercises](https://github.com/mikehans/az-cosmosdb-sdk-exercises) to explore the relationships and key operations.

#### SDK exercises
The project connects to CosmosDB database (it needs to exist prior to running the project), bulk uploads some data, modifies a record, deletes a record and queries the database. 

I used a bulk upload rather than a single create item operation as a bulk upload is essentially a group of individual create operations, executed as a list of Tasks. Each task is a call to ```Container.CreateItemAsync()```, which is the way you write a single record. The ```CosmosClient``` also requires some configuration with an object of type ```CosmosClientOptions```.

The demo project is a console application. I have used dependency injection to create a singleton ```CosmosClient```. I have provided two options for constructing it: one using a connection string; the other using a URI and a ```DefaultAzureCredential()```.  Both options take as their final parameter a ```new CosmosClientOptions()``` instance, where the client is configured for bulk uploads.

Below are the two variations I have used for configuring the ```CosmosClient```.
```csharp
    //   1. initialise with a connection string
    services.AddSingleton(
                s => new CosmosClient(
                        ctx.Configuration["CosmosDbConnectionString"],
                        clientOptions: new CosmosClientOptions() { AllowBulkExecution = true }));
```

```csharp
    //   2. initialise with DefaultAzureCredential - recommended in docs
    services.AddSingleton(
        s => new CosmosClient(
                "https://product-catalogue-db.documents.azure.com:443/",
                tokenCredential: new DefaultAzureCredential(),
                clientOptions: new CosmosClientOptions() { AllowBulkExecution = true }));
```

There was a problem with ```DbManagement.EnsureDbCreated()``` and ```DbManagement.EnsureContainersCreated()``` methods. Assuming that the database / containers exist, everything is fine (the ```Create[Database|Container]IfNotExistsAsync()``` methods are essentially no-ops in this case) however if the methods have to create an object, they fail. I'm not entirely sure why. I think I found a suggestion that this was an improper use of the SDK but I can't find the documentation around this now. [Documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/how-to-dotnet-create-container) clearly says it is a supported operation, so this leaves me with an area of uncertainty.

I have, however left these methods in the code for reference. They are just not being executed.

### Core operations (add, query, update, delete)
#### Add
```csharp
    container.CreateItemAsync(item, new PartitionKey(item.id))
```

In the demo project, I am reading a collection of categories in from a JSON file, parsing them as a collection of ```CategoryDTO``` objects, creating a new item from each one in a Task, then executing all the tasks at once with ```Task.WhenAll()```.

In the code snippet above, ```item``` represents a ```CategoryDTO``` object. I also need to new up a ```PartitionKey``` object and pass in the value being used. My container design in this case puts every category in its own logical partition.

#### Query
With queries, there are two general options:
1. ```GetItemQueryIterator<T>```, and
1. ```GetItemLinqQueryable<T>```

The examples below are essentially taken from [MS Learn - Query items in Azure Cosmos DB for NoSQL using .NET](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/how-to-dotnet-query-items)

In these first two examples, I am calling ```GetItemQueryIterator<T>```. The first example passes in a string, being the query. Using this form of the method, only canned queries should be used - no parameters should be permitted.
```csharp
    using FeedIterator<CategoryDTO> feed =
        container.GetItemQueryIterator<CategoryDTO>(
            queryText: "SELECT * FROM categories"
        );

    while (feed.HasMoreResults)
    {
        FeedResponse<CategoryDTO> results = await feed.ReadNextAsync();

        foreach (var result in results)
        {
            logger.Information($"Found result: \t {result.name}");
        }
    }
```

This second example uses an overload of ```GetItemQueryIterator<T>``` that takes a ```QueryDefinition``` object. Note how we can pass in a parameter safely into a query using the ```QueryDefinition``` and the ```WithParameter``` method.
```csharp
    QueryDefinition query = new QueryDefinition(
            query: "SELECT * FROM categories c WHERE c.name = @categoryName"
        ).WithParameter("@categoryName", "Brakes");

    using FeedIterator<CategoryDTO> filteredFeed = container.GetItemQueryIterator<CategoryDTO>(
                queryDefinition: query);

    while (filteredFeed.HasMoreResults)
    {
       // do stuff...
    }
```
The third example uses ```GetItemLinqQueryable<T>``` to construct an IQueryable from a LINQ query. This example only uses a single filter but the example on MS Learn demonstrates using several filters.
```csharp
    IOrderedQueryable<CategoryDTO> queryable = container.GetItemLinqQueryable<CategoryDTO>();

    IQueryable<CategoryDTO> matches = queryable.Where(c => c.parent.Id == "cat2");

    using FeedIterator<CategoryDTO> linqFeed = matches.ToFeedIterator();

    while (linqFeed.HasMoreResults)
    {
        // do stuff...
    }
```

#### Update
There are two methods that can be used to update a document:
1. ```UpsertItemAsync(objectToUpsert, PartitionKey)```
1. ```ReplaceItemAsync<T>(T, string id, PartitionKey)```

Both methods take a complete object that you want to insert, not just the updated fields. 

You'll need a reference to the object you want to update. In the demo project I've simply run a query, updated a field and written it back.

Interestingly, I had assumed that the RU cost of an Upsert operation would be greater than a Replace operation, however both cases returned an RU cost of 10.67 for an update to an existing item. You'll see the RU cost when you run the demo project. So the choice of which method to use comes down to what action you want to occur if the object you're updating doesn't actually exist in the database - insert it as a new item or fail the operation.

Each method call is shown below. the ```updatedCategory``` variable is the ```CategoryDTO``` object you will put back into the database.

```csharp
    ItemResponse<CategoryDTO> upsertItem = await container.UpsertItemAsync(
        updatedCategory, 
        new PartitionKey(updatedCategory.id)
    );

    ItemResponse<CategoryDTO> response = await container.ReplaceItemAsync<CategoryDTO>(
        updatedCategory, 
        result.id, 
        new PartitionKey(result.id)
    );
```

_Optimistic concurrency_
An addendum that I've only seen covered in the Packtpub exam guide is to use optimistic concurrency, you add a ```RequestOptions``` object to the operation.

EG.
```csharp
    var ac = new AccessCondition { 
        Condition = readDoc.ETag,
        Type = AccessConditionType.IfMatch
    };

    await client.ReplaceDocumentAsync( readDoc, 
        new RequestOptions { AccessCondition = ac });
```

#### Delete
Deleting an item is done with the ```DeleteItemAsync<T>(string id, PartitionKey)``` method. You delete an item by passing in the ID of the item and its partition key. These two properties are the standard two properties you need to uniquely identify an item in a Cosmos DB Core API database.

```csharp
    ItemResponse<CategoryDTO> response = await container.DeleteItemAsync<CategoryDTO>(
        result.id, 
        new PartitionKey(result.id)
    );
```

### Wrapping up
This article is constrained to developing an understanding of the SDK operations required for the AZ-204 exam.

Pay attention to the exam readiness videos. They reminded me that it's no only the SDK that matters. For Cosmos DB, you also need to understand topics related to:
* role-based access control (RBAC)
* consistency levels
* the change feed
* serverless vs provisioned throughput
* database scaling
* geo-replication
* setting time-to-live
* indexing policy

Interestingly, there appears to be no more mention of stored procedures, triggers or user-defined functions. Have they been dropped from the exam?