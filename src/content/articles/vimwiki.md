---
slug: "vimwiki"
date: "2021-02-22"
title: "Setting up vimwiki for note-taking"
author: "Mike Hansford"
type: "post"
tags:
    - dev tools
    - Vim
    - Neovim
    - Windows 10
---
## Up and running with vimwiki
Recently, I went looking for a no frills, low friction solution for technical note-taking. For years I've been strongly attached to OneNote, starting with my university studies and onwards through my technical work. For lectures it was great! I could print the lecture slides into a notebook and annotate them freely. It could find words in pictures and I could search a notebook for a word in a picture. Awesome. However, it's always left a bit to be desired when writing code - auto-correcting initial capitals, undesirable spell-checking of my code, etc. 

Recently I've come across <a href="https://vimwiki.github.io/" rel="noreferrer noopener" target="_blank">vimwiki</a>. It's a plug-in for vim that adds some standard wiki functions and a pretty easy markup. I can easily create hyperlinks to web pages or other vimwiki pages, create code, lists, tables, headings, tags and add images. You don't get to see the image in vim - you need to convert to something like HTML for that to happen. vimwiki also includes functionality to export to HTML as well. I haven't tested that part yet and it may be adequate. If I want something different, pandoc is also available and appears to be widely used by others who use vim for note-taking. I use <a href="https://github.com/junegunn/vim-plug" rel="noreferrer noopener" target="_blank">vim-plug</a> for my plug-in management so I added `Plug 'vimwiki/vimwiki'` into my init.vim file and ran `:PlugInstall` to install it.

The built-in syntax highlighting is basic but certainly adequate but for me the most useful part is that I can readily insert code without any of the friction that I always find with OneNote. I still have a bit to learn - searching my wiki and writing to HTML (with a stylesheet) especially. With pandoc, it looks as though I could write it to an epub as well and consume it freely on my phone. I haven't had any organisational issues with my content so far as there's so little of it but I'm keeping refactoring in mind as I go. There's still the never-ending problem of information currency - I don't know how to get over that one yet. Time will tell if I'm building something that remains current and useful or turns into the next cesspool of out of date junk.