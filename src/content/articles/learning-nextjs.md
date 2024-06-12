---
slug: 'learning-nextjs'
date: "2022-03-30"
title: "Learning NextJS"
description: "I'm adopting NextJS, a framework built on ReactJS for developing websites."
imageUrl: "/img/blurrycode.jpg"
author: "Mike Hansford"
type: "post"
publish: true
tags:
    - NextJS
---
## Learning NextJS
###What is NextJS?

NextJS is a framework for building websites based on ReactJS. It includes a number of features that make website building significantly better than React alone.

It includes a file path based router, meaning that the page's address is derived from the file location. For example, if you create a react component in /pages/index.js, this will become the home page of your site. Similarly, if you then create /pages/about-me.js, this is the page that will be returned if you navigate to /about-me. This is much better than mucking around with a SPA and programming React Router. In my opinion, for a non-SPA application, this is the best way of dealing with routing. It's an old and well tested method. This will cover the vast majority of your use cases. For the outliers, NextJS provides next/router, a module that allows you to programmatically drive the router.

NextJS also provides the ability to write server side code via API routes and several data fetching methods. These create NodeJS functions that execute on the server. They allow you to write protected code, that can securely access data stores and protect secrets. The data fetching methods allow for server side rendering and static site generation, both essential for site indexing by everyone's favourite Google / Bing bot. Client side data fetching (via React's useEffect hook) is of course possible.

### What's cool about it?

It's React. All your pages are React components. Everything that you already know about React works: hooks, Context API, composition, testing, everything. A new NextJS project doesn't seem to download anywhere near as much stuff as Create React App either and is ready to go faster.

### Differences to Create React App

In their own words, React is "A JavaScript library for building user interfaces." That's what it says on the tin.

NextJS is a toolkit for building websites with React. NextJS, rather grandly, proclaim on their website that it is "The React Framework for Production." Go figure...

On top of ReactJS, NextJS adds:
* a file system based router that you don't have to write code for (like React Router)
    * a page's path depends on its location in the file system (old school baby!)
    * no code means... 
        * there's no router logic to test!
    * but
        * there is a next/router module that allows you to programmatically modify the router in case you need that too
* the ability to write server side code (Node JS) that can securely access the file system or databases
* the ability to create statically generated or server side generated pages (on a page-by-page basis)


### Differences to Gatsby

#### GraphQL Data Plane

The big deal about Gatsby is that you bring your data into a single build-time, GraphQL data plane. It works pretty well and gives you a single way of obtaining your data for a page. To add a datasource, you install a Gatsby plug-in. There are over 2500 of them, so there's little need to worry about not having one available. Of course, if one doesn't exist, you can write your own. I did have some trouble when I needed to integrate two datasources into one collection for a page but I think it's a fair bet the fault is with me rather than Gatsby. I'd hazard a guess that customising the GraphQL data plane would allow me to create a projection from the datasource into whatever form I needed.

#### Original intent of Gatsby vs NextJS

Gatsby was originally built as a static site generator. Recent versions (the v4 major release added server side rendering among other things. The GraphQL data plane is also a big selling point and adds some real consistency to data access throughout the product. Gatsby works incredibly smoothly with Netlify. I have no idea how well Gatsby functions work with Netlify however. They're fairly new and I have no experience of them.

NextJS appears to have been built from the ground up with more flexibility in mind with regard to whether the site is built statically or server side. Server side generation is going to require more infrastructure than a statically built site ( your functions need to be hosted somewhere), so you need to be aware of this when you create your site. When I deploy to Netlify, Netlify has the sense to recognise I have a NextJS project, take my server side functions and convert them to serverless functions. That happens because Netlify knows what to do with a NextJS project. With other hosting providers, your mileage may vary. As NextJS is owned by Vercel, you'd expect it runs well on their infrastructure.

### Similarities to Sveltekit

Sveltekit is described as NextJS for Svelte. I adopted Sveltekit having only had Gatsby experience. The two were chalk and cheese, largely because of Gatsby's GraphQL data plane and Sveltekit's additional rendering flexibility (like NextJS, Sveltekit supports more than just static site generation). NextJS and Sveltekit work very similarly and the Sveltekit doco sometimes says that such-and-such a feature is similar to NextJS's such-and-such a feature.

If you don't know, Svelte is to Sveltekit as React is to NextJS. Svelte and React are the underlying libraries. Sveltekit and NextJS are frameworks built on top of Svelte and React (respectively) for building web applications.