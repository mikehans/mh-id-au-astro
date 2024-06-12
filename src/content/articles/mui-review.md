---
slug: "mui-review"
date: "2023-03-06"
title: "MUI 4 Review"
imageUrl: "/img/css.jpg"
author: "Mike Hansford"
type: "post"
publish: true
tags:
    - CSS
    - CSS-in-JS
    - CSS Frameworks
---
## MUI 4 Review
### What is MUI?
[MUI](https://mui.com) is a CSS Framework for ReactJS. It is a set of pre-built components that gives you much of what you typically need to build a website with React.

It uses CSS-in-JS for styling. Specifically, it uses [Emotion](https://github.com/emotion-js/emotion) by default and this can be swapped out for [Styled Components](https://github.com/styled-components/styled-components) if desired - coz, you know Styled Components is cooler.

TLDR; It's fine if you want a quick start. Particularly if you're building a demo and want a quick hit of styling.

### What's good about MUI?
#### Components
Developers using MUI benefit from the the quick start it gives them. As I said in the intro, you get a number of pre-built components. You also have a cohesive default theme out of the box. Some of them are quite basic, such as ```Box```, while others such as the ```Accordion``` or  ```Drawer``` are quite complex components, with JavaScript and styling rolled into one component. 

While the basic components are really basic and I often wonder why the MUI team even bothered with them, the more complex components really make MUI worthwhile.

#### Theming via Provider framework
Theming is done through the Provider framework which is an appropriate approach. I seem to recall that it's exactly one of the examples that the React doco uses as being a good use of the Provider framework (somewhere).

#### Good theming tool
To help create a theme, MUI provides a very decent theming tool. From what I've used of it, I can say it's very decent and includes all the built-in components so you can view and modify a theme.

#### The documentation
It's good. It really helps with adoption and use.

#### Options for styling
The documentation provides numerous options for [alternative styling methods](https://mui.com/material-ui/guides/interoperability/) including global CSS, CSS Modules and, er, even Tailwind. It also very clearly states that the CSS injection order needs to be changed and shows you how to do it. I haven't tried this yet but it looks to be a very good way of avoiding the problem of CSS-in-JS.

### What's not so good?
> _Attwood's Law_
>
> “Any application that can be written in JavaScript, will eventually be written in JavaScript.”

It doesn't mean it's a good idea.

#### CSS-in-JS
*sigh*...

CSS-in-JS is _never_ a good idea.

Firstly, it doesn't remove the need to understand CSS. A developer can try to ignore CSS but it's a reality of web dev. Just learn it. In some jobs I've worked, the hardest problems have been CSS problems*. It's part of the reality of working in the field.

Secondly, it leans towards writing something CSS-like only in the module, ignoring any sense of a cohesive design. You can't get a cohesive design by limiting your thinking to the module. Even if you do manage some sort of cohesive initial design, evolving it over time is going to be a nightmare. Say what? Theming? I am yet to be convinced that it's going to save you.

Thirdly, I've found that finding components in JSX that, when you look them up, exist only to provide styling adds additional cognitive overhead when adopting an existing codebase. When I'm interested in program flow, finding components whose sole reason for existence is to make something look right interferes with my train of thought.

#### Basic components not really doing anything
Some components seem to exist simply to keep everything looking like MUI.

The ```Box``` component simply puts a ```div``` element on the screen with some default theming like setting a font and some margins. And it, quite frankly does little else...

Every component has a number of what's called [system properties](https://mui.com/system/properties/) which are individual CSS properties wrapped up nicely for React's benefit. It just looks like trouble waiting to happen.

#### Grid component still using Flexbox
Hey, it's 2023. CSS Grid has been around for quite a while and every current browser supports it.

#### Media queries are a React hook
Why on earth do we want to complicate matters further? I think I've already moaned enough.

#### The default heading sizes for the Typography element are HUUUUUUUUGE!
Lesson 1: Creating a custom theme to resize those gargantuan heading sizes...

#### While it can be compatible with W2C ARIA guidelines, you're going to have to work for it
The out of the box behaviour of components will yield a DIV soup. You will have to use the ```component``` property on your components _a lot_ in order to create semantic HTML elements and will probably over-ride a lot of defaults along the way. 

Why not just use the semantic elements directly when you can? It seems to me there's going to be less messing around.

#### Does nothing to try to promote good CSS design
MUI encourages styling at the component level through the use of the afore-mentioned CSS-in-JS and system properties. To create a cohesive, maintainable style there are a many decisions - such as your heading styles - that need to be made at the level of the whole website. Styling these globally is essential to being able to creating cohesion and to managing your website over time. Styling them at the component level, as MUI encourages is a path to long term pain.

So right I can hear a bunch of React devs screaming that you create a HeadingOne component and style your headings there. Then all you have to do is reuse it everywhere. A component should exist for a functional reason, not for styling.

A more direct approach to the above faff would be to create CSS in the ```:root``` that directly styles ```h1``` to ```h6```. No messing around. Job's done. It's out of the way, leaving your JavaScript to do things that only JavaScript can do.

Sound CSS methodologies such as [SMACSS](http://smacss.com/) promote the use of a layered CSS design that controls you CSS from the page, down to the individual atom - applying styling at the relevant point. In doing this, CSS over-rides are minimised and you can creating a cohesive, maintainable style system.

### Summary
So, MUI provides some useful React components with a pleasant enough default theme. The complex components that you get out of the box can be a compelling reason to jump in. The basic components are of dubious value. 

MUI can be used with CSS Modules, which will be a superior way of managing your styles. With CSS Modules, you get all the benefits claimed by CSS-in-JS but without any of the issues.

--------------------------------

*Specifically, working around some horrible ```!important``` soup. Thanks Bootstrap. Nah, actually no thanks at all... it sucked. And the solution made me want to clean myself off.