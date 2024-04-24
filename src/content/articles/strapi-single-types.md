---
slug: 'strapi-single-types'
date: "2021-01-01"
title: "Working with Strapi Single Types"
description: "A discussion on pros and cons of using single types"
author: "Mike Hansford"
type: "post"
tags:
    - Strapi
---
# Working with Strapi Single Types

## Working with Strapi Single Types

I use Strapi Single Types for individual, one off web pages on my site. They provide a clear mechanism for showing what static pages I have and make editing them easy. So far, all my pages have the same fields and are based on 2 components and 1 relation:

* a Page component
* an SEO component
* a menus relation

To add a new page, I need to create it in my development environment as a new Single Type, commit the change, push it and wait for Heroku to pick up the change and build the new commit. I use the Content-Types Builder to do this. The Content-Types Builder is not available in production, hence new content types are build in a developer environment.

## The problem

For a commercial deployment, this can present a problem - only developers can create new pages. As content managers need to add or remove pages, this inserts developers into the content management pipeline. Content managers cannot make these changes on their own. Only existing pages can be modified.

## Solution

The best solution I can see to this is to create a Pages Collection Type. Provided all pages possess the same structure (as I have), this would mean that content managers can create or delete pages as required.