Punch UI [![npm][npm-image]][npm-url] [![Build Status][build-image]][build-url]
===========================

[npm-image]: https://img.shields.io/npm/v/punch-ui?style=flat-square
[npm-url]: https://www.npmjs.com/package/punch-ui
[build-image]: https://travis-ci.com/mtutynina/punch-ui.svg?branch=main
[build-url]: https://travis-ci.com/mtutynina/punch-ui

**Punch** UI is collection of UI components based on **KnockoutJS** and **Bootstrap 5**. Components can be used as part of your Knockout SPA application or as part of Razor Pages to improve your UI.

## Components list
- [Pagination](https://mtutynina.github.io/punch-ui/components/pagination.html)

### In the pipeline
- Table spinner
- Page spinner
- Date picker
- Select box

## Quick start
Install Punch UI with npm `npm install punch-ui`

Read the [Getting started page](https://mtutynina.github.io/punch-ui/#getting-started) for information on components and examples.

## What's included
Within the download you'll find the following directories and files
```
|---dist
|   |---index.d.ts
|   |---punch-ui.js
|---README.md
|---package.json
|---LICENSE
```
## Documentation
Punch UI documentation, included in this repo in the docs directory, is built with Jekyll and publicly hosted on GitHub Pages at https://mtutynina.github.io/punch-ui/. The docs may also be run locally.
### Running documentation locally
1. [Install Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)
2. Open terminal in `docs` folder
3. Run `bundle install`
4. Run your site locally `bundle exec jekyll serve`
5. To preview site, in your web browser, navigate to http://localhost:4000

## Examples
Visit [examples repository](https://github.com/mtutynina/PunchUIExamples) to see all available use cases.

## Project structure and source code
### Components
The source code of each component is located in a separate component folder in the `src` directory. Component folder consist of following files:
1. `component-name.ts` - Component's specific logic.
2. `component-name.html` - Component's html template.
3. `component-name.css` - Component's specific styles (Not required).
4. `index.ts` - Register new knockout component here.  

Example:
```
|---src
|   |---pagination
|      |---index.ts
|      |---pagination.html
|      |---pagination.ts
```
### Tests
#### Jest
In test folder you can find tests setted up with jest. Run in terminal from root folder `npm run test`
#### Example Project
You can check component in action by implementing new component usage inside [project with examples](https://github.com/mtutynina/PunchUIExamples)  
To check local changes that are not in npm use `npm link`:  
```
cd punch-ui
npm link
npm run build
cd ../PunchUIExamples/PunchUIExamples
npm link punch-ui
npm run build
```
### Scripts
`npm run build` - Packs bundles with webpack  
`npm run test` - Runs tests  
`npm run lint` - Analyzes code style using eslint rules  


