# scully-plugin-lazy-images

[![npm version](https://badge.fury.io/js/%40notiz%2Fscully-plugin-lazy-images.svg)](https://www.npmjs.com/package/@notiz/scully-plugin-lazy-images)

`scully-plugin-lazy-images` is a `postRenderer` plugin for [Scully](http://scully.io/) turning your images into lazy loading images using [lazyload](https://github.com/tuupola/lazyload). This will replace the `src` attribute with `data-src` and adds the class `lazyload` to the `img` tag.

The content around an image changes after the image is **lazily** loaded. To prevent the content to "jump" after loading, the `height` and `width` of the image is calculated and a placeholder `svg` is added to the `src` attribute with the image dimensions. The `svg` placeholder is replaced with the actual image after it is loaded. 

A browser [native approach](https://web.dev/native-lazy-loading/) would be to use `loading="lazy"` for each `img` tag. When it has broader [browser support](https://caniuse.com/#feat=loading-lazy-attr) we will switch to the native approach.

## 📦 Installation

To install this plugin with `npm` run

```
$ npm install @notiz/scully-plugin-lazy-images --save-dev
```

## Usage

Add the plugin to the `defaultPostRenderers` in your `scully.config`:

```js
require("@notiz/scully-plugin-lazy-images");

exports.config = {
  projectRoot: "./src/app",
  defaultPostRenderers: ["lazyImages"],
  routes: {}
};
```

If you want to use the plugin for a specific route do:

```js
require('@notiz/scully-plugin-lazy-images');

exports.config = {
  ...
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/blog'
      },
      postRenderers: ['lazyImages']
    }
  }
  ...
};

```
