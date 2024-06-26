---
    title: Implementing a multi-tree (forest) structure in C#
    description: An implementation of a multi-tree product categories structure. Based on the product categories implementation in Commercetools.
    slug: "ms-900-microsoft-365-fundamentals"
    date: "2024-06-26"
    author: "Mike Hansford"
    type: "post"
    publish: false
    tags:
        - C#
        - .NET
        - data structures
---
# Implementing a multi-tree (forest) structure in C#

Some time ago, I was asked to get a little familiar with Commercetools. If you don't know, Commercetools is a SaaS-based e-commerce platform.
Essentially it contains the data structures for a product catalogue and can accept orders. There's more to it but that will suffice for now.
I was very interested in how it stored its product categories. You can explore how it is implemented by using somthing like Postman to query it and view the results. Using this, I implemented something similar in C#.

## Observed implementations
One typical implementation I've seen is just two columns - category and sub-category. It's a lousy concept that leaves much to be desired. It's basically the concept you see in Microsoft's AdventureWorks sample database. This in itself should tell much - it's a sample, not a recommendation on how to build something real.

A second implementation I've done is to use SQL and a self join. With this idea, you can model arbitrary depth and a multi-tree structure. You'd have some work to do to create the features that my implementation here provides.

## My implementation
My implementation is based on nested dictionary structures. I also tried to apply the DDD principle of the Aggregate and the Aggregate Root. A fundamental of this principle is that all access to the aggregate is only through the root. More on that one later.

### Forest
The whole forest is stored in a dictionary. This is the definition of the forest dictionary:
```csharp
    private readonly Dictionary<string, CategoryTree> _forest = new();
```
For the life of me now, I can't remember why I made it read only but I'm sure the reason was good.

The key is the ```Name``` property of the root category of the tree. I did this so you couldn't make two trees called "Menswear" for example. It also means that you don't have to mess around with figuring out what the random value of the key is when you want the Menswear category, rather to get the menswear category tree you just call 
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

The ```internal``` access modifier means that it cannot be constructed outside of the assembly, effectively meaning that only the Aggregate Root can construct it. In DDD, we want to do this.

So seeing as we can't create a new tree from outside the Aggregate, the forest contains a method - ```AddTree(ICollection<Category> newTreeItems)``` - that creates the tree and adds all the members to it. This method will be called when: we create a tree from scratch, and; when we re-hydrate a forest from storage.



## Discussion
* design your aggregates from the aggregate root in
    * I created a CategoryTree first then wrote unit tests for it. 
    * in doing this, I created its methods as public and created leakage as a result
    * undoing the leakage took a lot of work
    * I think if I started with the aggregate root and worked inwards I wouldn't have create this leakage
* no recursion
* basic data structures

## stuff
The Commercetools documentation also talks about using this structure to indicate whether a product is on sale. 