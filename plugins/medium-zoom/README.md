# scully-plugin-medium-zoom

[![npm version](https://badge.fury.io/js/%40notiz%2Fscully-plugin-medium-zoom.svg)](https://www.npmjs.com/package/@notiz/scully-plugin-medium-zoom)

`scully-plugin-medium-zoom` is a `postRenderer` plugin for [Scully](http://scully.io/) adding a medium style zoom to your images using [medium-zoom](https://github.com/francoischalifour/medium-zoom). This plugin adds `data-zoomable` attribute to each `img` tag in your route.

## 📦 Installation

To install this plugin with `npm` run

```
$ npm install @notiz/scully-plugin-medium-zoom --save-dev
```

## Usage

Add the plugin to the `defaultPostRenderers` in your `scully.config`:

```js
require('@notiz/scully-plugin-medium-zoom');

exports.config = {
  projectRoot: './src/app',
  defaultPostRenderers: ['mediumZoom'],
  routes: {},
};
```

If you want to use the plugin for a specific route do:

```js
require('@notiz/scully-plugin-medium-zoom');

exports.config = {
  ...
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/blog'
      },
      postRenderers: ['mediumZoom']
    }
  }
  ...
};
```
