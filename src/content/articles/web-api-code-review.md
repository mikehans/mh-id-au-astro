---
slug: 'web-api-code-review'
date: ""
title: "Azure Functions Demo Confusion on MS Learn"
description: "Reflections on a less than successful C# Web API code test."
author: "Mike Hansford"
publish: false
type: "post"
tags:
    - Web API
    - C#
---
Recently, I was asked to complete a software development test. The brief asked me (roughly speaking) to build a service that connects to the a public web service that pertains to music and responds to queries for an artist and their releases. I was to submit what I thought would be what I thought great engineering should look like. 

All in all, this is the kind of ""coding test"" that is useful in a recruitment process. It sets the company apart from many I've interviewed with over time who consider a coding test to be a compsci quiz that a fresh graduate would nail but has little to do with the practice of commercial software development.

## Feedback
The company was good enough to provide feedback on what I had and had not done as follows:
* Areas for improvement:
  * No unit test suite (I depended on a Postman functional test suite)
  * I'd put my business logic inside the controller file (inside separate functions but I really should have broken this out)
  * No logging / authentication

They also provided some positives:
* Swagger definition
* used DTOs for data transfer
* API works well

Mostly, I think I fell into demo-ware mode - I was building this in my own time and was under time pressure to get it finished.

## Review and this series
In this post, I'll review my design and provide a better alternative. Let's call it part of getting better. In the interests of not providing any prospective candidates a google-able solution I'm shifting the context to the Open Library API (https://openlibrary.org/developers).

This is likely to be much too long for a single post, so I'll cover off the following topics in separate posts (I'll update with links as I write them)
* Intro and project goals (this post) 
* API design
* Initial unit test suite
* Initial API implementation
* Postman functional test suite
* Logging
* Authentication and authorisation
* (anything else I haven't thought of yet?)

## Redesign
### Functionality
The API will return a list of movies. For each movie, some basic details are returned as well as a list of the characters and locations. A user can then drill down into each character to see biographical facts about them and will be able to see which movies the character appeared in.

### Software design
The software is an ASP.NET Web API based on .NET 6, the current LTS at the time of writing. 

There will be a single controller with two endpoints - one for getting movies and one for getting character details. The API will require authentication. DTOs will be used to return data to the requester. 

The software will be created with testability in mind, usually in a test first manner. API tests will be provided via a Postman test suite.
