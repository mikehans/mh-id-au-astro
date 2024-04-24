---
slug: "vite-for-react-projects"
date: "2022-12-06"
title: "Using Vite for React Projects"
author: "Mike Hansford"
type: "post"
tags:
    - dev tools
    - React
    - Vite
---
Vite (https://vitejs.dev) is a build tool that seems to be in use in the Vue community. It competes with other tools like Webpack.

It is based on Rollup and is lightning fast. During my early tests it has finished building so quickly that, expecting the build to take a while (thanks to my experience with Create React App); not seeing stuff scrolling past on the console I've thought that the build has broken, only then to see a message saying my site is available on localhost:3000...

## Getting started
Start with the guide [here](https://vitejs.dev/guide/) 

Running ```npm create vite@latest ``` will start the wizard which will step you through everything.

...or run 
```shell
    npm create vite@latest my-react-ts-app -- --template react-ts
``` 
for a React project with Typescript support, or
```
    npm create vite@latest my-react-app -- --template react
``` 
for a React project without Typescript support (but why would you???).

*Note*: You need the extra "--" in the command line. I missed it at first.

Here's the result of me running the create command, then listing directory contents.
![create result](/images/vite-react-gci.png)

Then run ```npm install```. This adds only 86 packages. That beats Create React App hands down. Unlike CRA, only a mere fraction of the internet gets downloaded! 

![npm install result](/images/vite-react-npm-i.png)

Total install size is a shade under 100MB (as of 6 Dec 2022)

![](/images/vite-react-npm-i-gci.png)