---
slug: 'megamenu-demo'
date: "2023-07-31"
title: "Megamenu Demo From Scratch"
description: "It's time I build a megamenu component from scratch"
imageUrl: "/img/css.jpg"
author: "Mike Hansford"
type: "post"
tags:
    - CSS
    - web dev
---
# Megamenu Demo (from scratch)
## Why?
It's one thing to use a component that someone else has built. It's another thing to know how it works. This is the fundamental difference between "someone who makes websites" and a professional web developer. So, it was high time I built my own - no frameworks, just me, HTML, CSS and JavaScript. Oh and [Astro](https://astro.build). Coz I want to get some experience using it.

## The demo's requirements
I wanted to build a megamenu that would / could be W3C ARIA compliant. Particularly, I wanted good keyboard control. I haven't tested it against a screenreader. It could be interesting to do so but this is a thing that is firmly in the "maybe later" column.

For keyboard control, I referred to the [ARIA Authoring Practices Guide section on the Menu and Menubar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/). Specifically, I referred to the (Navigation Menubar Example)[https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/] for a description of the keyboard controls.

The top level design consisting of an HTML button element sitting beside an HTML anchor element both wrapped in an HTML LI element sourced from the ACCC website (https://accc.gov.au). I liked the ideas they use here:
* the megamenu opens on a hover event over the anchor
* clicking / tapping on the anchor element takes you to a default page for that section
    * in the ACCC example, it takes you to a page where the content of that mega-submenu is available and keyboard navigable
* there is a button element next to the anchor with a click event that opens / closes the mega-submenu.

Using HTML UL elements for the megamenu levels adds strong implicit semantics to the menu structure, enhancing the accessibility qualities of the megamenu pretty much for free. This yields some very useful results for a screenreader such as:
* on entering a list, it will state "list of [COUNT] items"
* it provides additional keyboard navigation controls that allows a user to navigate to
    * the start of a list
    * the end of a list
    * to move to the next item
    * to move to the previous item
    * to jump past the list

I'm not sure what the addition of the ```aria-role``` attributes do that I added - they were present on the ARIA Authoring Practices Guide, so I inserted them here.

The wrapping ```nav``` element has an ```aria-label``` set to "Main menu", so a screen reader would read "Main menu", when you focus the ```nav``` element then "List of 4 items" when you focus on the ```UL```. Cool. That seems helpful.

In general for items that visually are a list, you gain benefits from making them a semantic list. Sure, there is likely to be some additional CSS but it's hardly a burden, especially when you gain things for free with the screenreader.

## Constraints
Many of my constraints are a function of time. I just needed to get to "done enough".

* Keyboard navigation isn't complete 
    * I haven't programmed the Home and End keys that the ARIA Authoring Practices Guide says I need
* The visual design needs love
    * I've never claimed to be a designer, only a developer
* The down arrow on my buttons could be sexier
    * I could have used a Fontawesome icon for the down and up
* I am only supporting a single level of sub-menu
* I am only supporting a single list in the sub-menu
    * One option would be to support many lists, each with their own headings in the megamenu. This would look nice and help to break it up visually

## Key lessons
### Kyboard support
Adding additional keyboard support is a lot of work. While you do get _some_ keyboard support out of the box, it is very limited.

Adding the ability to use the arrow keys requires thought and work to program but the result is well worth it. I would definitely not use my code as is - it's very much still demoware and could use refactoring but it's definitely a good start.

The use of the anchor tag and the button yield some good benefits.
* Adding a CSS hover selector to the list item means that hovering on the anchor element bubbles up to the list item
    * this yields a useful action for mouse users
* If you click / tap on the anchor, it is up to the developer to present the megamenu content to the user in another way
    * A developer could take a leaf out of the ACCC website behaviour here
* The button element comes with its own strong semantics around handling of the click event
    * 

###