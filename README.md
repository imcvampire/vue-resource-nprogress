# vue-resource-nprogress

[![Greenkeeper badge](https://badges.greenkeeper.io/imcvampire/vue-resource-nprogress.svg)](https://greenkeeper.io/)

This is a fork of [vue-resource-progressbar-interceptor](https://github.com/staskjs/vue-resource-progressbar-interceptor) but instead of using [vue-progressbar](https://github.com/hilongjw/vue-progressbar), this plugin uses [nprogress](https://github.com/rstacruz/nprogress)

Module attaches interceptors to vue instance which controls progressbar on top of the screen.

## Installation

    $ npm i vue-resource-nprogress

Then in your code:

    const Vue = require('vue');
    const VueResource = require('vue-resource');
    const VueResourceNProgress = require('vue-resource-nprogress');

    Vue.use(VueResource);
    Vue.use(VueResourceNProgress);


NOTE: You should have `NProgress` installed globally. 
A example of this is adding `nprogress` plugin in `<script>` in `<head>`

### Using CommonJS

```
npm i nprogress
import NProgress from 'nprogress'
window.NProgress = NProgress
require('nprogress/nprogress.css')
```

## Configuration

By default progressbar shows for every single request.

In order not to use progressbar for certain requests, use `showProgressBar` parameter in request.

Like this:

    Vue.http.get('/url', { showProgressBar: false })

Configuration options:

    Vue.use(VueResourceProgressBarInterceptor, {
      latencyThreshold: 100, // Number of ms before progressbar starts showing, 100 is default
    });

## Notes

This plugin was inspired by [this angular.js version](https://github.com/chieffancypants/angular-loading-bar).
