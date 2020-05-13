# scully-plugin-rss

`scully-plugin-rss` is a `postRenderer` plugin for [Scully](http://scully.io/) adding creating a rss feed from your content using [feed](https://github.com/jpmonette/feed) and [showdown](https://github.com/showdownjs/showdown).

The rss feed is available at:

- your-domain.de/feed.json
- your-domain.de/feed.xml

## 📦 Installation

To install this plugin with `npm` run

```
$ npm install @notiz/scully-plugin-rss --save-dev
```

## Usage

Add the plugin to the `defaultPostRenderers` in your `scully.config`:

```js
require('@notiz/scully-plugin-rss');

exports.config = {
  projectRoot: './src/app',
  defaultPostRenderers: ['rss'],
  routes: {},
};
```

If you want to use the plugin for a specific route do:

```js
require('@notiz/scully-plugin-rss');

exports.config = {
  ...
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/blog'
      },
      postRenderers: ['rss']
    }
  }
  ...
};
```
