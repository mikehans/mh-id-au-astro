---
date: "2023-04-03"
slug: "azure-functions"
title: "Azure Functions Exercises"
description: 'Learning exercises in Azure Functions'
imageUrl: '/img/azure-kingfisher.jpg'
author: "Mike Hansford"
type: "project"
publish: true
---
In my pursuit of my Azure Developer certification, I have built a series of exercises to learn to create Azure Functions in C#. 

The Github repo for this project can be found here: https://github.com/mikehans/az-funcs-exercise.

### Scenario
The scenario here is that I am obtaining a list of 100 posts from https://jsonplaceholder.typicode.com/posts, parse the list into individual posts, write them to Cosmos DB and then query Cosmos DB.

### Summary of the exercises
I wrote 4 functions for this project. The exercises are not intended to be anything that can be deployed to production - they're quite inefficient in terms of the number of functions that execute and the storage that gets consumed. In Azure terms, it's all cost.

The four functions are:
1. A function with an HTTP trigger that obtains the 100 posts from jsonplaceholder.typicode.com and writes the list to blob storage.
1. A function with a blob storage trigger, that parses these posts into individual items and writes them into queue storage.
1. A function with a queue storage trigger, that writes these items into Cosmos DB.
1. A function with an HTTP trigger that takes an ID and queries Cosmos DB for the post with that ID.

As I said, it's inefficient but the point of the exercise is to gain some experience building functions that read and write to and from different triggers and bindings.

### Deployment instructions
To deploy the function app, I created a resource group containing a function app (.NET in-process); the associated storage account; and a Cosmos DB account. All are in the same region to reduce latency between the components. 

The one change I'd make to check how resources are being utilised on my free Cosmos DB account. You get 1 free Cosmos DB account per subscription. I forgot and incurred some small cost. Next time, I'll just ensure that the database is in the same region as the app - it may well be in a different resource group if I already have a free Cosmos DB account.

In the function app's application settings (Settings -> Configuration -> Application Settings), I configured 2 settings:
* ```CosmosDbConnectionString```
    * set to the Primary Connection String setting from the Keys section of your Cosmos DB account
* ```AzureWebJobsStorage```
    * a function app requires a storage account and this setting should be set to the storage account key during setup of the function app

The function app will create the storage containers it needs and the Cosmos DB and container if they don't already exist, so I have no need to create them by hand.

If only there was a way I could automate deployments from Github... and even create the infrastructure. You know, automatically... 

### Description of the function app
#### GetPostsData.cs
GetPostsData.cs is an HTTP triggered function that obtains the posts data and writes it to blob storage. In this simple instance, I hard-coded the URL into the function but in a more useful function it would be passed in as a parameter or be obtained from app settings. It feels a little odd declaring the output binding as a parameter. It's a little like an output parameter, which always feels a little odd to me too. The ```{rand-guid}``` function generates a GUID. In this case, I'm assigning it as the filename for the output blob.

```Csharp
[FunctionName("GetPostsData")]
    public static async Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req, 
        ILogger log,
        [Blob("posts-data/{rand-guid}.json", FileAccess.Write)] Stream blobby
        )
```

#### ParsePostsData.cs
ParsePostsData.cs is a blob triggered function. When a new blob is written it picks up the file, breaks it into individual items and puts each item on a Queue Storage queue.

To use the Blob trigger, I chose the overload that uses a Stream. Calling ```Stream.ReadAsync``` is a standard streaming operation, taking a byte array (an array initialised to the length of the content) , the starting point (the offset) and the number of bytes to read. The method reads from the stream and writes to the byte array. The return value from ```Stream.ReadAsync``` is just so I can log how many bytes were read. Then decode the bytes to a string.

On line 29, I'm using ```Newtonsoft.Json.JsonConvert.Deserialize<T>()``` to convert the string into a collection of Post objects. 

Then each post is written to the queue in the foreach loop (lines 32 - 36).

Note that for this demo app, I'm not removing the blob. Depending on the need for data preservation, I'd have to decide to either keep or delete it.

```Csharp
[FunctionName("ParsePostsData")]
    public static async Task RunAsync(
        [BlobTrigger("posts-data/{name}")] Stream postsBlob,
        string name, ILogger log,
        [Queue("posts-queue")]ICollector<Post> postsQueue
        )
```

#### ParseQueueToCosmosDb.cs
ParseQueueToCosmosDb.cs is a storage queue triggered function. When an item it put on the queue, this function then reads it and puts it into Cosmos DB.

In true demoware style, I have hard-coded the database name (usefully names "Stuff") and the container name. For simplicity's sake, I have also told the function to create the database if it doesn't exist.

The class ```CosmosPost``` is slightly different from ```Post```. The Id field of the Post will be put onto the PostId property of the ```CosmosPost``` and a new GUID will be created as the Id of the ```CosmosPost```. I thought I could use the Id property from ```Post``` but Cosmos kept throwing an error. It's likely this comes from my lack of knowledge of Cosmos DB and is a question to be answered later. This object is then written to the output binding.

```Csharp
[FunctionName("ParseQueueToCosmosDb")]
    public static void RunAsync(
        [QueueTrigger("posts-queue")] Post myQueueItem,
        ILogger log,
        [CosmosDB(
            databaseName: "Stuff",
            containerName: "posts",
            Connection = "CosmosDbConnectionString",
            PartitionKey = "/id",
            CreateIfNotExists = true
        )] out CosmosPost postsDb)
```

#### GetPostByPostId.cs
GetPostByPostId.cs is an HTTP triggered function. It takes an Id and searches Cosmos DB through an input binding for a record with a matching PostId attribute. I am retrieving a ```List<CosmosPost>``` as if I run the functions again, the posts will be added a second time, so there will be 2 results for a search for the PostId. This is a demoware thing - in an operational system, I should be ensuring that the PostId is unique. The PostId should be the Id property in Cosmos DB but I am yet to learn to model data in Cosmos DB. Allowing for multiples to be retrieved just gets me around a potential problem for now.

```Csharp
 [FunctionName("GetPostByPostId")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
        ILogger log,
        [CosmosDB(
            databaseName: "Stuff",
            containerName: "posts",
            Connection = "CosmosDbConnectionString")]CosmosClient client)
```

## Summary
This project was built to explore triggers, input and output bindings in Azure Functions. It is a worthwhile project, if somewhat contrived - as all good exercises should be really. 