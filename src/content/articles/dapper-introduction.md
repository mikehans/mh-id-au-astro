---
date: "2023-04-09"
slug: "dapper-introduction"
title: "Dapper Introduction"
description: 'Learning exercises in Dapper'
imageUrl: '/img/dapper.jpg'
author: "Mike Hansford"
type: "project"
publish: true
---
I've heard a lot about [Dapper](). It's promoted as a micro-ORM and reputed to be somewhat faster than Entity Framework. It's supported by Stack Exchange and they use it regularly (along with Entity Framework). 

My own interest in it is that I am becoming more interested in removing what I feel to be unnecessary layers of abstraction. In the case of Entity Framework, we add things to our model to make it work properly with our database. It's not just with my database, I've [already written](/blog/mui-review) (moaned semi-coherently?) about why I think CSS-in-JS is never a good idea.

## Github repo
My Github repo for this project is [here](https://github.com/mikehans/TodoList-sql2).

## Project setup
So as not to have to mess around with any automated deployment, I manually created a SQL Server database and added the connection string to my appsettings.json. Here, I created a database named TodoList. The rest is just a standard localhost SQL Server connection string. I have also created a key for using SQLite in memory. It doesn't work in reality as I need to add code to create the SQLite DB but the intent is valid for this demoware project.

```json
{
  "ConnectionStrings": {
    "SQLServerConnectionString": "Server=.\\MSSQLSERVER;Database=TodoList;Trusted_Connection=True;",
    "SQLiteInMemoryConnectionString": "Data Source=:memory:"
  }
}
```

## Dependency injection
The program is a console application configured with the Microsoft default dependency injection container.

Two services are injected with the singleton lifetime:
* the ```TodoList.DataAccess.DataAccess``` service (well named I know)
* the ```TodoList.DataAccess.DataAccess.CreateDbConnection``` delegate

The DataAccess service is pretty standard stuff.

The injection of the delegate type is interesting and I have [this blog post from Christian Findlay](https://www.christianfindlay.com/blog/c-delegates-with-ioc-containers-and-dependency-injection) to thank for it.

### Dependency injection of delegate types
My initial cut of this project was hard coded for SQL Server. During the initial writing, I realised that the only database engine specific code was the declaration of the ```SqlConnection``` (defined in ```Microsoft.Data.SqlClient```). This is an ADO.NET type that implements ```IDbConnection```. Realising that I could swap out the database and that it was only one method, a delegate seemed the logical choice. 

The only thing to determine then was how to swap the delegate type used at runtime. Discovering that they were supported by the dependency injection container was exactly the solution I needed.

## Using Dapper
The project has only two operations:
* one to read all todos
* one to add a todo

For reading the todo, I simply wrote inline SQL ```SELECT * FROM TodoList```. It's a pretty generic statement and will work on pretty much any database engine.

To add a todo, I need the database to generate its own primary key (the ID field). This is a data logic operation that the database should be allowed to control and the exact method may vary between database engines. This was the main reason that I wrote a stored procedure to control the insert (the other was to gain experience with it for this project). The stored procedure name for this project has been hard-coded. For the sake of the example, the stored procedure also creates a few additional fields. This is why there are two models - one for returning a todo item from the database and one for inserting a todo.

## Summary
Dapper is great to work with. As someone who has written ADO.NET before it made a lot of sense.

The dependency injection container has no knowledge of Dapper at all. Compare this with using Entity Framework, where it is explicitly used by the dependency injection container. The only knowledge that the dependency injection container has of any database is the use of ```System.Data.IDbConnection``` when configuring the delegate singleton. 

The database models exist wholly for the database. There is nothing to do to satisfy the needs of the ORM. The ```Query``` and ```Execute``` methods from Dapper are thin wrappers around ADO.NET that map the POCO to the SQL.