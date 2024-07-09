---
    title: Implementing a multi-tree (forest) structure in C#
    description: An implementation of a multi-tree product categories structure. Based on the product categories implementation in Commercetools.
    slug: "implementing-a-forest-in-csharp"
    date: "2024-07-09"
    author: "Mike Hansford"
    type: "post"
    publish: false
    tags:
        - C#
        - .NET
        - Domain Driven Design
---
# Implementing a multi-tree (forest) structure in C#
Some time ago, I was asked to get a little familiar with Commercetools. If you don't know, Commercetools is a SaaS-based e-commerce platform.
Essentially it contains a product catalogue and can accept orders. It's a competitor for Shopify. There's more to it but that will suffice for now.
I was very interested in how it stored its product categories. I used Postman to explore the categories implementation and produced something similar in C#.

## Observed implementations
One typical implementation I've seen is just two columns - category and sub-category. It's a lousy concept that leaves much to be desired. It's basically the concept you see in Microsoft's AdventureWorks sample database. This in itself should tell much - it's a sample, not a recommendation on how to build something real.

A second implementation I've done is to use SQL and a self join. With this idea, you can model arbitrary depth and a multi-tree structure and definitely reflects reality.

## My implementation
I created a C# project and have it on GitHub here: https://github.com/mikehans/product-catalogue

For this discussion, I only want to focus on these two projects:
* Categories
* Categories.Tests

The other two relate to CosmosDB storage, for which I used the local emulator. The storage doesn't matter, as long as it implements the ```IStorage``` interface found in the Categories project. ```IStorage``` only contains methods to store the whole forest and to read the whole forest. It's enough for demoware.

My implementation is based on nested dictionary structures. I also tried to apply the DDD principle of the Aggregate and the Aggregate Root. A fundamental of this principle is that all access to the aggregate is only through the root. More on that one later.

### Forest
The whole forest is stored in a dictionary. This is the definition of the forest dictionary:
```csharp
    private readonly Dictionary<string, CategoryTree> _forest = new();
```
For the life of me now, I can't remember why I made it read only but I'm sure the reason was good.

The key is the ```Name``` property of the root category of the tree. I did this so you couldn't make two trees called "Menswear" for example. It also means that you don't have to mess around with figuring out what the random value of the key is when you want the Menswear tree, rather to get the menswear category tree you just call: 
```csharp
    _forest["Menswear"] 
```

### Category Tree
A category tree is also stored in a Dictionary object. This is the definition of a tree dictionary:
```csharp
    private readonly Dictionary<string, Category> _hierarchy;
```

A category tree must be created with a root category, which I'm doing in the constructor:
```csharp
    internal CategoryTree(CategoryBasic rootCategory)
    {
        var category = new Category
        {
            Id = rootCategory.Id,
            Name = rootCategory.Name,
            IsRoot = true
        };
        _hierarchy = new Dictionary<string, Category> { { rootCategory.Id, category } };
    }
```

The ```internal``` access modifier means that it cannot be constructed outside of the assembly. Only the Aggregate Root can construct it. In DDD, we want to do this.

So seeing as we can't create a new tree from outside the Aggregate, the forest contains a method - ```AddTree(ICollection<Category> newTreeItems)``` - that creates the tree and adds all the members to it. This method will be called when: 
* we create a tree from scratch, and
* when we re-hydrate a forest from storage.


## Discussion
* design your aggregates from the aggregate root in
    * I created a CategoryTree first then wrote unit tests for it. 
    * in doing this, I created its methods as public and created leakage as a result
    * undoing the leakage took a lot of work
    * I think if I started with the aggregate root and worked inwards I wouldn't have create this leakage
* no recursion
* basic data structures
* I don't like how a forest is created in the test suite. CategoryForest really should contain a constructor / method that takes any number of trees (whatever representation) and creates a forest from them.


### Making a tree from a dictionary
A tree implies recursion. I'm not very good at recursion - isn't that one of the few hard problems in comp sci, along with naming things (?) - so I looked for an alternate solution.

I found a hint to it from the JSON that a category returned from Commercetools. It contained two things:
* a reference to its parent, and
* a list of its ancestors

Each of these looked something like this:
```json
    {
        "id": "ABC-123",
        "name": "A category"
    }
```
The ID attribute would have been sufficient but including the name yields some benefits:
* you can use the category's name in UI or data without having to query for it
* if (for example) you want all menswear items, you can simply query the Ancestors for any occurrence of the "menswear" category without having to traverse the tree

To these I added an attribute to identify the root element and an attribute to aid in deleting a category from a tree.

With this structure, navigating from the root down isn't terribly efficient - the only way is by then searching the Parent attribute of each node for the id of the current node. It is more efficient to navigate back up the structure using the Parent attribute of the current element. Aggregation is also more efficient, owing the the presence of the Ancestors attribute. I think I'm prepared to accept these trade-offs.

### Inside out / outside in design
Designing my aggreates from the inside out caused a lot of problems with information leakage. 

I had created my entity (```CategoryTree```) and had written the unit test suite. All passed. Great. Then I created the aggregate (```CategoryForest```) and the test suite. All passed. Great. Now the problem: my test suite is silent to the fact I have a leaky aggregate. *facepalm* Discovering and fixing the leakage was a lot of work. Consider the Aggregate Root to be the interface to this structure. Write the tests for the interface and go from there.

A better design approach when designing an aggregate will be to design it ouside in. Next time, I'll create my aggregate and consider everything it needs to do. Writing these as tests would be a wonderful idea. Then build the insides, connecting these to the aggregate root to provide functionality and data to its consumers.

### Constructing the forest
The test suite illustrates how the forest is constructed. Frankly, it's pretty lousy. I have to create the trees individually, create a forest and add the trees to the forest. This is a good candidate for a builder. I should be able to throw any number of tree-like structures at the builder and have the builder do the work of constucting the trees, the forest and adding the trees to the forest, performing all validation along the way. The signature might look something like this:
```csharp
    public CategoryForest ForestBuilder(jsonTree1, jsonTree1, ...[jsonTreeN]);
```

### Not just categories
In one e-commerce job I had years ago, we had a product catalogue full of boolean fields. Things like a tick box for whether it was a featured product or on sale or any number of other badges. Over time, this led to the product entry becoming very large.

The Commercetools documentation also talks about using the categories structure for these boolean fields. In my project here, there would be a ```CategoryTree``` with a root node called "Featured" and another tree with a root node called "Sale" and so on. Imagine then on the website navigating to the Menswear home page. The "Featured Products" grid would then be fed by a single query for the "Featured" category and any product that had a category with an ancestor of "Menswear". Then when you navigate to Mens -> Shirts, the "Featured Products" grid would be fed by a single query for the "Featured category" and any product with the ancestors "Menswear" and "Shirts". And so on, for T-shirts or polo shirts. 