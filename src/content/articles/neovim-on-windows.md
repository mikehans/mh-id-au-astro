---
slug: "neovim-on-windows"
date: "2021-02-02"
title: "Set up Neovim on Windows 10"
author: "Mike Hansford"
type: "post"
tags:
    - dev tools
    - Vim
    - Neovim
    - Windows 10
---
## Neovim on Windows
Firstly, for the uninitiated, what is Neovim? Neovim is a re-build of the venerable Vim editor found on pretty much every Linux system out there. For Windows users, it's also in your Git bash or WSL installation. It's the default editor for git commit messages. Neovim is compatible with Vim 8 (the latest major version at the time of writing). 

### Why would a Windows user bother with Vim / Neovim?
Firstly, as I've already stated, you have it in your Git bash or your WSL 2 distro. It is most likely configured as the default editor for your git installation. Most Windows users will want to replace it but it's a very capable editor. In the past, I've used it as my git diff tool and I'll probably go back to it in the near future as I have had it working pretty well for me in the past.

Secondly, I've become less and less enthusiastic about VSCode over the last year or so. I'm currently typing this post in VSCode so I'm definitely using it and I don't utterly hate it. However, while setting up my machine for my new job, I've been thinking that all this setup really doesn't get me more than I can otherwise get with Vim but I'm throwing away a lot of sheer editing power by not using Vim. I'm busy setting up a lot of plug-ins in VSCode then trying to figure out why they aren't working properly. I'm not sure VSCode puts me in a better position. Certainly for JavaScript / Typescript development. Possibly also for C# but that remains to be seen.

OK, so I can hear you saying right now that there is a Vim plug-in for VSCode and why don't I just use that and be done with it. I'm here to tell you that it's just not quite the same thing. Like the lolly bananas... they're pretty good but they're just not quite like real bananas.

### Prior Vim experiences
In a previous job, I was one of a team of developers maintaining an elderly codebase that we think had around 750,000 lines of code. And we weren't sure how much of it was still in use. It wasn't built with what we'd consider to be modern development standards. I really struggled to be productive with it in VSCode. Intellisense performed poorly or not at all, even with basic arrays - it didn't produce Array.prototype.* in the Intellisense. Even alphabetic matching failed miserably. 

Using Vim, even in a relatively unconfigured state, I was able to get more useful basic editing assistance. I frequently noticed that the thing I needed to use was right above the line I was currently typing. While in Insert Mode, Ctrl-P was easily my best friend as this shortcut opens an auto-complete window. Ctrl-P would automatically select the first match beginning by looking back up the file I was on. Awesome sauce! 

The Language Server Protocol (LSP) has helped matters a lot too. There are a number of plug-ins for Vim that use the LSP that can really take your code editing forward. While various people have built language plug-ins for Vim in the past, the Language Server Protocol is really helping to move things forward for Vim.

OK, so I mentioned Insert Mode just before. What on earth is Insert Mode?

### Modal editing
Vim is a modal editor. What this means is that what keystrokes do depends on the "mode" of the editor. There are many modes but the ones used most are:
* Normal mode
    * Normal mode is where you do most of your text operations such as cutting, copying, pasting, deleting, moving, etc. In this mode, you can't type characters on the screen. Of course some Vim legend will probably say otherwise. I'm just an advanced beginner.
* Insert mode
    * This is where you put text on the screen. There are some pretty awesome ways you can edit text in this mode.
* Command mode
    * This is the mode I use to do a lot of the editor operations (as opposed to document operations like in Normal or Insert mode). 
    * In this mode I'll save documents, open tabs and windows and move them around and do some pretty cool find/replace operations. There's probably a lot of other stuff that I can't think of right now.
* Visual mode
    * This mode allows me to select blocks of text and edit them. Mostly I'll select words or lines but you can also select vertical blocks, though I rarely use this.

### This is getting long already...
Ah, OK I didn't really intend to write so much about why I like Vim / Neovim. I meant to write about how I'm configuring Neovim for my use developing Typescript, JavaScript and (potentially) C# on Windows but that's going to have to wait for another post. That one's a work in progress that I'll need to revisit several times.