---
slug: "microsoft-identity-ms-600"
date: "2020-11-11"
title: "Microsoft Identity (MS-600)"
author: "Mike Hansford"
imageUrl: "/img/matrixything.jpg"
type: "post"
publish: true
tags:
    - MS-600
    - Microsoft Identity
    - Microsoft 365
    - certification
---
## Microsoft Identity (MS-600)
### Summary of what I think matters so far
OK, so Microsoft Identity is a large component of MS-600: Building Applications and Solutions with Microsoft 365 Core Services. It's the exam you need for the <a href="https://docs.microsoft.com/en-us/learn/certifications/m365-developer-associate" target="_blank" rel="noreferrer"> Microsoft 365 Certified: Developer Associate certification</a>. 

Identity is a large and complex domain of knowledge, so I want to unpack it a bit here. Importantly, what is the required knowledge and what are the constraints for the exam?

This was going to be a single page, but it long quickly. So, refer to the Table of Contents below.


### Contents
1. [Register an application](microsoft-identity-ms-600-page-2)
1. Implement Authentication
1. Configure Permissions to Consume an API
1. Implement Authorisation to Consume an API
1. Implement Authorisation in an API
1. Create a Service to Access Microsoft Graph

### Glossary
* Account type
* Delegated permissions
* Consent
* OpenID Connect
* OAuth 2.0
* Home tenant
* Appliction object
* Service principal object
* Guest account
* Authentication
    * Identifies who you are
* Authorisation
    * Determines what you can do
    * Occurs only after authentication
* Topology
    * relates to whether the application is a SPA, web app, web API, mobile or desktop app, or daemon app

### Resources
The <a href="https://docs.microsoft.com/en-us/learn/paths/m365-identity-associate/" target="_blank" rel="noreferrer">Microsoft Learn path for Identity</a> is a good starting point.
The <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/" target="_blank" rel="noreferrer">Azure Active Directory documentation</a> is also really important.
