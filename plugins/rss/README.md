# scully-plugin-rss

[![npm version](https://badge.fury.io/js/%40notiz%2Fscully-plugin-rss.svg)](https://www.npmjs.com/package/@notiz/scully-plugin-rss)

`scully-plugin-rss` is a `routeDiscoveryDone` plugin for [Scully](http://scully.io/). A RSS Feed is created from your content using [feed](https://github.com/jpmonette/feed) and [showdown](https://github.com/showdownjs/showdown).

The rss feed is available at:

- your-domain.de/feed.json
- your-domain.de/feed.atom
- your-domain.de/feed.xml

> **Breaking Change** introduced in Version 1.0.0 with changing the plugin type from `render` to `routeDiscoveryDone`. This has the major benefit of only generating the RSS Feed once per run instead of after each page render.

## 📦 Installation

Install the RSS Feed plugin using the command

```bash
npm install @notiz/scully-plugin-rss --save-dev
```

## Usage

Require the plugin in the Scully config file:

```js
require('@notiz/scully-plugin-rss');

exports.config = {
  projectRoot: './src/app',
  defaultPostRenderers: ['rss'],
  routes: {},
};
```

It will run on only routes that include `/blog` unless specified otherwise in the `rss.config.json` file. The order of the posts will be oldest first unless the `newestPostsFirst` option is set in the config.

Create a `rss.config.json` in your root with the following properties:

```json
{
  "title": "Your Title",
  "description": "Page description",
  "id": "https://your-domain.com",
  "link": "https://your-domain.com",
  "language": "en",
  "image": "https://your-domain.com/featured.png",
  "favicon": "https://you-domain.com/favicon.png",
  "copyright": "2020 your-domain.com",
  "generator": "Page description",
  "feedLinks": {
    "json": "https://your-domain.com/feed.json",
    "atom": "https://your-domain.com/feed.atom"
  },
  "outDir": "./dist/static",
  "categories": ["Categories", "of", "your", "choice"],
  "blogPostRouteSlug": "/blog",
  "newestPostsFirst": true
}
```

Each RSS Feed item attributes are currently assigned by the following scully route attributes.

| RSS Feed Item | Scully Route                  |
| ------------- | ----------------------------- |
| `title`       | `title`                       |
| `id`          | `slug`                        |
| `link`        | Config Link + `slug`          |
| `description` | `description`                 |
| `content`     | `articleHTML`                 |
| `author`      | `authors`                     |
| `contributor` | `authors`                     |
| `date`        | `updatedAt` \|  `publishedAt` |

Your content should have the following front matter in your scully content:

```
---
title: Martial Arts Training
description: Best Martial Arts Training
publishedAt: 2020-03-25T10:12:00.000Z
updatedAt: 2020-03-25T10:12:00.000Z
published: true
tags:
  - training
  - rss
authors:
  - Bruce Lee
---
```
