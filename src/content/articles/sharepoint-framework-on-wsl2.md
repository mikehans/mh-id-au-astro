---
slug: "sharepoint-framework-on-wsl2"
date: "2020-10-28"
title: "Developing with SharePoint Framework on WSL2"
author: "Mike Hansford"
type: "post"
tags:
    - SharePoint Framework
    - WSL
---
## Running SharePoint Framework on WSL2
OK, here's a quick one for today...

Microsoft doesn't seem to discuss developing SharePoint Framework with WSL2. So far I haven't had any issues with it, so it seems about time to discuss it.

### Why?
SharePoint Framework requires NodeJS 10.x. In fact, it won't work on a more recent Node version. On my Windows 10 machine I'm running a later release. Ubuntu on WSL allows me to manage my NodeJS versions with <a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noreferrer">Node Version Manager</a> <i class="fas fa-external-link-alt"></i>. With this I can have multiple Node versions installed and can alternate between them. I just need to remember to ensure which Node version I'm running before I start work.

### Setting up SharePoint Framework in WSL2
#### Assumptions
First of all, some assumptions... I'm assuming you have the already have the following set up:
* <a href="https://docs.microsoft.com/en-us/windows/wsl/install-win10" target="_blank" rel="noreferrer">WSL2</a> <i class="fas fa-external-link-alt"></i>
* <a href="https://www.microsoft.com/en-us/p/ubuntu-2004-lts/9n6svws3rx71?activetab=pivot:overviewtab" target="_blank" rel="noreferrer">Ubuntu running in WSL2</a> <i class="fas fa-external-link-alt"></i>
* <a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noreferrer">nvm</a> <i class="fas fa-external-link-alt"></i> installed
* Node 10.x LTS installed in nvm (```nvm install --lts=dubnium```) and have switched to it (```nvm use lts/dubnium```)
* <a href="https://www.npmjs.com/package/yo" target="_blank" rel="noreferrer">Yeoman</a> <i class="fas fa-external-link-alt"></i> and <a href="https://www.npmjs.com/package/@microsoft/generator-sharepoint" target="_blank" rel="noreferrer">@microsoft/generator-sharepoint</a> <i class="fas fa-external-link-alt"></i> are installed globally through npm (```npm install -g yo @microsoft/generator-sharepoint```)
* While you're supposed to install <a href="https://www.npmjs.com/package/gulp" target="_blank" rel="noreferrer">Gulp</a> <i class="fas fa-external-link-alt"></i> globally, you don't need to and there are some good reasons not to. 
    * Instead of typing  ```gulp serve``` as you do when Gulp is installed globally, you can type ```npx gulp serve``` or add it to a start script in your package.json and type ```npm start```. I recommend the latter.

#### How to set it up
The Yeoman SPFx generator pretty much works as normal with this one caveat.

There is an instruction to run ```gulp trust-dev-cert```. On Windows 10, this adds a self-signed certificate into your Certificate Store. Running this from WSL2 won't work.

The self-signed certificate will be found in ```~/.gcb-serve-data```. You need this to run the local workbench.

1. Mash on your Windows key and type 'certificate'. You should be able to find 'Manage user certificates' in your Control Panel. 
1. Right click on the Personal folder and select All Tasks -> Import
1. Browse for the certificate at ```$wsl/Ubuntu-20.04/home/ubuntu/.gcb-serve-data``` (I'm using Ubuntu 20.04 on WSL2. If you're using something different, browse to that instead)
1. You'll be asked where to put the certificate. 'Personal' is probably already selected. This is probably the best place to put it.
1. The certificate is called _'ASP .NET Core HTTPS development certificate'_

### YMMV
So far, it's working fine for me. The only issue I had was forgetting to ensure my Node version before compiling. I ended up with a nasty and confusing looking build error while still using Node 12 LTS. So be sure you're running Node 10 by typing ```node --version```.
