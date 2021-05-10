---
layout: default
title: Pagination
nav_order: 1
parent: Components
---

<h1>Pagination</h1>
<p>
A long list can be divided into several pages using Pagination, and only one page will be loaded at a time.
</p>

1. TOC
{:toc}

## Registration
Paginantion could be registered with [all components](/punch-ui/#register-components) at same time or individually:
```js
import * as ko from "knockout";
import { registerPaginationComponent } from "punch-ui";
...
function bootstrap() {
    registerPaginationComponent();
    const app = new App();
    ko.applyBindings(app);
}
```
### Component name
Default component name is `pagination`, but you can name it whatever you want, just pass your component name to registration function: 
```js
registerPaginationComponent("my-pagination");
```
or when registering all components:
```js
registerComponents({ paginationComponentName: "my-pagination" });
```

## Examples
### Basic pagination
To use the basic pagination specify `totalItems` and `onChange` handler.
Total items property can be a [Knockout Observable](https://knockoutjs.com/documentation/observables.html) as well.
{% include_relative pagination/basicPagination.html %}
```html
<pagination params="{ totalItems: 100, onChange: onChange}"></pagination>
```

### Grid
Pagination component layout is build with [Bootstrap Grid](https://getbootstrap.com/docs/5.0/layout/grid/).
So you can use it as a [column](https://getbootstrap.com/docs/5.0/layout/columns/) in your custom row.
{% include_relative pagination/grid.html %}
```html
<div class="row align-items-center">
    <div class="col-12 col-md-4 fw-bold">
        My custom Column.
    </div>
    <div class="col-12 col-md-8">
        <pagination params="{ totalItems: 100, onChange: onChange}"></pagination>
    </div>
</div>
```

### Small size
Need smaller component? Set `size` property to `small`.
{% include_relative pagination/smallSize.html %}
```html
<pagination params="{ totalItems: 100, onChange: onChange, size: 'small'}"></pagination>
```
### More pages
To show more pages specify `visiblePagesCount` parameter.
{% include_relative pagination/morePages.html %}
```html
<pagination params="{ totalItems: 100, onChange: onChange, visiblePagesCount: 10 }"></pagination>
```
## Razor Pages
You can use pagination inside .Net Razor Pages. Selected `pageSize` and `currentPage` values could be bound to page model with query strings. You should set `useQueryStringParameters` to `true` and paginator will change query string parameters and reload page on change. You can also override default query string parameters names, for each component using `pageSizeQueryString` and `currentPageQueryString` properties.
```html
<pagination params="{ totalItems: @Model.Total,
            pageSize: @Model.PageSize,
            currentPage: @Model.CurrentPage,
            useQueryStringParameters: true}"></pagination>
```

## API
{% include_relative pagination/paginationApi.html %}

## Defaults override.
You can override global default values of API Properties in order to not specify it for each component separately.  
Note that it is not necessary to overwrite all the defaults, overwrite only what you need.
```js
import * as ko from "knockout";
import { registerPaginationComponent, overrideConfiguration } from "punch-ui";
...
function bootstrap() {
    const paginationConfiguration = {
        currentPageQueryString: "pageNumber",
        icons: {
            next: "next-icon",
            prev: "prev-icon",
        },
        useCookieForPageSize: true,
        size: "small",
        useQueryStringParameters: true,
        initialCurrentPage: 2,
        pageSize: 20,
        pageSizeOptions: [20, 50, 100],
        pageSizeCookieName: "pageSizeCookie",
        pageSizeQueryString: "pageSize",
        visiblePagesCount: 10,
    };
    overrideConfiguration({pagination: paginationConfiguration, });
    registerPaginationComponent();
    const app = new App();
    ko.applyBindings(app);
}
```
