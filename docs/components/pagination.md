---
layout: default
title: Pagination
nav-order: 3
parent: Components
---

<h1>Pagination</h1>
<p>
A long list can be divided into several pages using Pagination, and only one page will be loaded at a time.
</p>

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

## API
{% include_relative pagination/paginationApi.html %}

