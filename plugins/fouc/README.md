# scully-plugin-fouc

`scully-plugin-fouc` is a `postRenderer` plugin for [Scully](http://scully.io/) to prevent **f**lash **o**f **u**nstyled **c**ontent.

## 📦 Installation

To install this plugin with `npm` run

```
$ npm install @notiz/scully-plugin-fouc --save-dev
```

## Usage

Add the plugin to the `defaultPostRenderers` in your `scully.config`:

```js
require("@notiz/scully-plugin-fouc");

exports.config = {
  projectRoot: "./src/app",
  defaultPostRenderers: ["fouc"],
  routes: {}
};
```

If you want to use the plugin for a specific route do:

```js
require('@notiz/scully-plugin-fouc');

exports.config = {
  ...
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/blog'
      },
      postRenderers: ['fouc']
    }
  }
  ...
};

```
