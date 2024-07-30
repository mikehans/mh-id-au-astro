---
slug: 'autofac-idatetime'
date: "2024-08-1"
title: "Providing an IDateTime interface for dependency injection with Autofac"
description: "Documents an approach for creating an interface to remove the concrete dependency on DateTime.Now."
author: "Mike Hansford"
imageUrl: "/img/keyboard.jpg"
type: "post"
publish: true
tags:
    - C#
    - dependency injection
---
# Dependency injecting System.DateTime
## Motivating example
While experimenting with clean architecture in C# a while ago, I came across this [talk](https://www.youtube.com/watch?v=hV43fiHYBb4&t=810s&pp=ygUgamFzb24gdGF5bG9yIGNsZWFuIGFyY2hpdGVjdHVyZSA%3D) from Jason Taylor and its accompanying [codebase.](https://github.com/jasontaylordev/NorthwindTraders) In it, he creates an ```IDateTime``` interface where he provides a ```Now``` property. He explains that directly using ```System.DateTime.Now``` creates problems for testing as it is reaching outside of the program into the system to obtain the current date and time (ie. it's an external dependency). For testing we want to replace these to better control our tests. By introducing an interface for these properties, it is now easy to replace the implementation of ```DateTime.Now``` for testing.

## Demo code
The project here [https://github.com/mikehans] is a small example including an initial test with Autofac as the dependency injection container. Insde ```AF.DateTime``` there is an interface ```IDateTime``` and two classes: ```AppDateTime``` and ```FakeDateTime```. ```FakeDateTime``` would ordinarily be defined inside the test project and directly instantiates a new DateTime - in this case 1 April 2024, 5:20:30 pm. 
```csharp
    public class FakeDateTime : IDateTime
    {
        System.DateTime IDateTime.Now => new System.DateTime(2024,4,1,17,20,30);
    }
```
I have defined it here simply for convenience. ```AppDateTime``` is the class used in production and simply defers to ```System.DateTime``` (see below).

```csharp
    public class AppDateTime : IDateTime
    {
        public System.DateTime Now => System.DateTime.Now;
    }
```

```AF.DTConsumer``` contains two classes. One takes ```IDateTime``` as a constructor parameter, the other as a required property. The names are really dumb but oh well.

```autofac-tester``` is where the main program exists along with all the DI related code. (see below)
```csharp
    IHost host = Host.CreateDefaultBuilder(args)
        .UseServiceProviderFactory(new AutofacServiceProviderFactory())
        .ConfigureContainer<ContainerBuilder>(b =>
        {
            b.RegisterModule(new FakeDateTimeModule());
            b.RegisterModule(new DateTimeModule());

            b.Register(c => new MyConsumer { _dateTime = c.Resolve<IDateTime>() });
            b.RegisterType<AConsumer>();
        })
        .Build();
```
 To configure Autofac, I have instantiated ```AutofacServiceProviderFactory``` to tell the program to use Autofac instead of the built-in DI container. Then inside ```ConfigureContainer<ContainerBuilder>()``` I have set up the container. There are two options for ```builder.RegisterModule```: one for the ```FakeDateTime``` class (currently commented out - you can only play with one at a time) and one for the ```AppDateTime``` class.

 ```MyConsumer``` takes an ```IDateTime``` paramater in the constructor. To register it correctly here, I need to new up the class and provide the param from the DI container.

 ```AConsumer``` has a required property of type ```IDateTime```. 

 ## Discussion
 Constructor injection is generally preferred as it creates an immutable dependency. Property injection is less preferred as the dependency is changable. Mark Seemann [https://blog.ploeh.dk/about/] says in _Dependency Injection in .NET_ [https://www.manning.com/books/dependency-injection-principles-practices-patterns] that property injection is useful where you have an optional dependency with a sensible default. Neither is really true in the way I have used them here but let me explain myself...

 ```AConsumer``` takes ```IDateTime``` as a constructor parameter. This would be a great option where you are writing classes from scratch. It is possible that retro-fitting it into existing classes could get interesting, especially if the class is well used with many call sites. I could envisage that there could be a lot of work to update code in many places just to modify one class. Perhaps. The idea of this fills me with some dread but I think that's my JavaScript pain talking. C# is better behaved, right. _Right?_

 ```MyConsumer``` doesn't take ```IDateTime``` as a constructor parameter. In existing codebases, I think there could be a benefit in not needing to modify existing class constructors - fewer changes as call sites aren't being modified.

 The registration of the two classes is necessarily different as for ```MyConsumer``` I need to instantiate it with its parameters - specifically I also need to fish out the ```IDateTime``` implementation out of Autofac.

 ### Limitations of the demo
As usual, this demo is demo-ware. In ```Program.cs``` I am directly fishing ```AConsumer``` and ```MyConsumer``` out of Autofac with ```host.Services.GetRequiredService<T>()```. In doing this, I'm using the DI container more like a Service Locator however it lets me shortcut things to get to the point of the demo.

### Initial impression of Autofac
It seems pretty nice. It has good support for modules, something we'll implement by hand with the built-in DI container - it's not hard but it's nice to have a bit of support from Autofac. We can use modules to separate out the components and services we wish to register into sensible, er, modules. Autofac's support for property and method injection as well as constructor injection are nice. However the real reason I'm digging into Autofac is for the named or keyed services, which was a big issue I wrote about [previously](articles/redis-caching-proxy/) an plan to write about again.