---
slug: 'azure-functions-demo'
date: "2022-04-21"
title: "Azure Functions Demo Confusion on MS Learn"
description: "Documents an issue with an MS Learn module for Azure Functions and the correct steps."
author: "Mike Hansford"
imageUrl: "/img/azure-kingfisher2.jpg"
type: "post"
publish: true
tags:
    - Azure
---
# Azure Functions Demo Confusion on MS Learn
## The problem

I'm working through the exercise Create an Azure Function by using Visual Studio Code.

The prerequisites stipulate using Azure Functions Core Tools v 3.x and .NET Core 3.1. However the VS Code extension for Azure Functions will create a project using Azure Functions Core Tools v 4.x as of today (21 April 2022).

If you don't notice this and build your function, you will get the following error in your terminal:

```
System.Private.CoreLib: Could not load type 'System.Diagnostics.DebuggerStepThroughAttribute' from assembly 
'System.Runtime, Version=4.2.2.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a'. 
Value cannot be null. (Parameter 'provider')
```

## Fix

The problem occurs because there is a mismatch between the Azure Core Tools version and the VS Code extension default.

Azure Core Tools v.3 will only support .NET Core 3.1 LTS.

To support .NET 5 and .NET 6, install the Azure Core Tools v.4 instead.

The discussion of the issue is here: https://github.com/Azure/azure-functions-core-tools/issues/2838

MS Docs also has a table of the Azure Functions runtime version and the applicable .NET versions here. It's just not connected to the MS Learn content.