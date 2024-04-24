---
slug: "site-development-visual-design"
date: "2020-11-10"
title: "Site Development: Visual Design"
author: "Mike Hansford"
type: "post"
tags:
    - site development
    - visual design
---
## Visual design - off to a rocky start
OK, so I guess I thought visual design was going to be fairly easy. Alas no, I'm being reminded that I'm graphically challenged.

I suppose I've always been somewhat spoiled, having competent visual designers working with me. Now the shoe's on the other foot, I'm struggling a bit.

At least I've made some improvement on my original design. Grey and white theme it is for now! Boring but not entirely offensive.

Additionally, as I haven't designed a site from scratch in quite some time, getting the major parts working has involved sweeping some cobwebs away. There's plenty to revise here.

## Latest updates
Well, now that I've pushed some layout and colour updates, I have a header and footer that stretch across the page, a footer that sits at the bottom of the screen if the content is too short and a better card based layout for my blog posts. 

There's a few issues with the blog cards as the screen width shrinks and below a certain, yet-to-be-determined screen width, I'm better off shifting my content left to maximise screen space. Card widths need a bit of love overall. I'm not overly happy with their resizing and alignment behaviour on wide screens either. Maybe I'm better off dumping the 1100px max-width.

There is space to the right for a tag list and archive, once I develop these components. I'm fairly happy with static designs I have for them right now - it just comes down to building them now. As screen width reduces, they'll probably shift under the main content section.

The menu will likely need some love at some point. As screen width reduces, the menu may start looking pretty messy. Frameworks like Bootstrap allow you to drop to a hamburger menu. Maybe that's an idea. I've also seen a fly-out/ fly-over menu that comes out from the side. We'll see...

## Headless CMS
I had a brief look at headless CMS options this week. There are essentially two kinds - API based and Git based. I found a discussion on YouTube called <a href="https://www.youtube.com/watch?v=KX4G49ZrvY0&t=1620s" target="_blank" rel="noreferrer">Git-based or API-driven CMS - Chris Macrae</a>. <i class="fas fa-external-link-alt"></i> 

A Git based CMS is easier to get going with, while an API based CMS is re-usable - you can write content once and consume it readily throughout your business. It's an interesting idea. I had heard of <a href="https://ghost.org/" target="_blank" rel="noreferrer">Ghost</a> <i class="fas fa-external-link-alt"></i> , which I have discovered is an API based CMS and Netlify promotes <a href="https://www.netlifycms.org/" target="_blank" rel="noreferrer">Netlify CMS</a> <i class="fas fa-external-link-alt"></i> , which is a Git based CMS. I'm going with Netlify CMS as it's pretty easy to use and I don't need the benefits of an API based CMS.