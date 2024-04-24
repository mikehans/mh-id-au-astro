---
slug: 'strapi-authentication'
date: "2022-04-08"
title: "Authentication in Strapi"
description: "Trials in setting up authentication for Strapi for use (initially) by NextJS."
author: "Mike Hansford"
type: "post"
tags:
    - Strapi
---
# Authentication in Strapi

## My scenario

Strapi drives the content for my website (https://mikehansford.id.au). I want my content to be protected so that it is consumed only through the platform/s I choose. If I set read permissions to be public, then anyone with the URL could easily obtain all my content and do whatever they want with it. While this is "just" my own personal website, I still want to maintain some control over how my content gets used. In the case of a commercial entity, this would be especially important.

## So far...

OK, so I've determined that I want authenticated access to my content.

As I'm also using NextJS, I want to statically compile my site so that the Google / Bing bots can index it. I want my Strapi data to be integrated into the site using NextJS's server side capabilities. This means that I can implement a private OAuth flow. This means that the client credentials are protected on the server.

My initial attempt was to log into Strapi using the built-in username/password mechanism, which provides a JWT bearer token that is used to fetch content. The naive approach was to log in prior to every fetch. This resulted in an HTTP 429 (Too Many Requests) error, leading to failed builds.

## The goal

The goal is to implement machine to machine communications using the OAuth2 client credentials grant flow. This involves storing authentication details privately on the front end server (Netlify in my case), where they can be protected and used to access secured resources from Strapi. For this, I think I need to implement one of Strapi's alternate OAuth providers.

## Backlog...

This one is going onto the backlog as I have a lot to do to get this site operational.