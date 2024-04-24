---
date: "2021-03-13"
slug: "react-starter-kit"
title: "React JS Starter Kit"
description: 'Iteration of a React starter kit owing to dissatisfaction with Create React App'
author: "Mike Hansford"
type: "project"
publish: true
---
> EDIT (6 Dec 2022): I no longer think this is a good idea. Instead, [Vite](https://vitejs.dev) gives me everything I was hoping to get with
> this project and more. See my post on using [Vite for React projects](/blog/vite-for-react-projects).

*Project Source:* https://github.com/mikehans/ReactStarterKit

My React JS starter kit came about as I was dissatisfied with Create React App. Create React App is a kitchen sink project - it has everything. A bare project comes in at around 700MB. This is of no use to me for most of my projects, which are quite small and I want to get going on them quickly. The sheer mass of Create React App prevents me from getting going quickly.

I have marked it in Github as a template as this adds functionality in Github to create a new project from the template.

This is a purely front end project at present, though you could readily add a Node JS backend to a project created with this template. To drive the front end delivery, I chose to use Browsersync as it includes the capability of driving multiple browsers at once. It was envisaged that this would be useful for UI testing across browsers, however this is likely to be a requirement I don't need in the end.

### Shortcomings
Presently, React projects don't live reload in the browser. There appears to be a project around that will allow live reload for React projects but I've presently forgotted what this is. I'll include it if / when I locate it.

### Alternatives
However, I've recently come across an alternative build tool called <a href="https://snowpack.dev" target="_blank" rel="noreferrer">Snowpack</a>. It appears that this includes some live reload functionality out of the box. Snowpack calls it Fast Refresh. Will I get around to checking it out? Maybe. However, Webpack is the tool that is commercially beneficial to me so it will be getting more of my attention.

### Future Development
This project is a good candidate for a fake JSON server, specifically <a href="https://github.com/typicode/json-server" target="_blank" rel="noreferrer">json-server</a> and possibly also <a href="https://json-schema-faker.js.org/" target="_blank" rel="noreferrer">JSON Schema Faker</a> for fake data generation.