---
title: "Sass Media Query mixin — Spring Cleaning"
date: "2017-01-04"
type: Blog
url: https://medium.com/@ConnorHolyday/sass-media-query-mixin-spring-cleaning-28659f93c1cb
---

As I’m sure you can relate, over time you seem to collect snippets of code that are supposed to make your life easier. Every now and then however a new feature might ship (come on CSS Grids!) or some browser support is no longer relevant. As such some of these snippets deserve to be dusted off and given a fresh coat of paint.

One that I use **all the time **is the [Media Query mixin](http://alwaystwisted.com/articles/updating-my-sass-media-query-mixin) for Sass by the ever so talented Mr [Stuart Robson](undefined) 🔥

![[Data from Can I Use](http://caniuse.com/#feat=css-mediaqueries)](./sass-1.png)_[Data from Can I Use](http://caniuse.com/#feat=css-mediaqueries)_

Recently our needs have changed, and we no longer need to support browsers that in-turn don’t support media queries. This means we can drop the “less than IE9” section of the mixin.

```scss
@mixin mq($value, $feature: 'min-width') {
```

The arguments have also been renamed: the first argument is now simply $value as it could relate to a numerical value, or something else like a device orientation. The second argument is now called $feature and it has a default value of ‘min-width’ because we like to build from the feet up (mobile first). This value can easily be overwritten to ‘max-width’ or even something like ‘orientation’.

```scss
@if map-has-key($breakpoints, $value) {
  $value: map-get($breakpoints, $value);
}
```

The first section of the mixin involves a check against our global breakpoints map, we use this to keep a standard set of breakpoints. For the fine-tuning of components we can instead pass in a numerical value.

```scss
@if type-of($value) == "number" {
  $value: $value + px;
}
```

The second section is a check to see if the supplied value is a number; if this is true then it uses a default pixel unit. In any instance that we’d like to use something other than pixels we can supply that unit with the value itself — thereby failing this condition.

```scss
// $value: can be a number, 'landscape', or a breakpoint letter
// $feature: default is min-width,
// can be overwritten with 'max-width', or 'orientation' etc.
@mixin mq($value, $feature: "min-width") {
  @if map-has-key($breakpoints, $value) {
    $value: map-get($breakpoints, $value);
  }

  @if type-of($value) == "number" {
    $value: $value + px;
  }

  @media screen and (#{$feature}: $value) {
    @content;
  }
}
```

And there you have it!
