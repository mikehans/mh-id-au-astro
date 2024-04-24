---
slug: "implementing-strapi"
date: "2021-12-02"
title: "Implementing Strapi.io"
description: "Initial experiences of implementing Strapi.io, a headless CMS as the content manager for my site."
author: "Mike Hansford"
type: "post"
tags:
    - Strapi
---
# Implementing Strapi.io
## Why?

I have been maintaining both the site features / design and the content in the same Github repo. Each post has been managed on its own branch, along with site features which also reside on their own branch.

This creates a problem where working on a branch to create content introduces confusion when I'm also modifying site features or design.

Publishing a post has been done by merging with master branch. Netlify then picks up the change to the master branch and re-deploys the site.

## The idea

Introducing a headless CMS will allow me to manage content independently of the site. It would also give me (hopefully) a better editing experience, both visually as well as allowing me to manage drafts and publishing.

## Prior experience

This is in effect a return to an idea I developed back at the start of my career while working at Cambridge Integrated Services. What happened was that I maintained the intranet in aspnet2. At one point I became unwell and missed a month of work. As intranet changes depended on me doing work, this created a problem when I was absent for an extended period. This illustrated to me that the developer cannot be essential to business processes.

## Outcome

I have settled on deploying Strapi. I could have just have easily chosen Sanity or something else but I chose this one. It was a case of just pick one and go. I'm presently drafting this on a Strapi v3 CMS instance. Strapi v4 was released in the last few days. It looks like there are some nice API updates, though the responses are different and will create breaking changes for consuming applications. So far I haven't integrated Strapi into Gatsby using gatsby-source-strapi. While I could upgrade to Strapi v4 now before I integrate with Gatsby, I think the migration process will be valuable.