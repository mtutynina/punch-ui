---
layout: home
title: Home
nav-order: 1
---
# Build fast. Use components.
{: .fs-8 }
**Punch UI** is an open source components library for faster and easier web development. Each component is build with [KnockoutJS](https://knockoutjs.com/index.html), written in [Typescript](https://www.typescriptlang.org/) and styled with [Bootstrap 5](https://getbootstrap.com/).
{: .fs-5 .fw-300 }

[Get started now](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/mtutynina/punch-ui){: .btn .fs-5 .mb-4 .mb-md-0 }
---
# Getting started
The guide assumes that you have intermediate knowledge about HTML, CSS, Typescipt and Knockout.
The library can be used in two ways:
- as a part of your Knockout application
- as a part of Razor Pages

## Setup for Knockout application
### Import Bootstrap styles
Include bootstrap styles to your page as you like, all bootstrap theme customisations will be applied to components as well.

### Import Punch UI
First, install the metapackage. This will install the latest version of package
```js
npm i punch-ui
```
Below is the default directory structure
```
|---dist
|   |---index.d.ts
|   |---punch-ui.js
|---README.md
|---package.json
|---LICENSE
```
### Register components
Then somewhere in your app, before you call ```ko.applyBindings()``` , you should register components.
You can register all Punch UI components at ones with ```registerComponents()``` or each one you need separately.
Registration instructions for each component will be presented in components documentation.
```js
import * as ko from "knockout";
import { registerComponents } from "punch-ui";
...
function bootstrap() {
    // Register all Punch UI components.
    registerComponents();
    const app = new App();
    ko.applyBindings(app);
}
```
