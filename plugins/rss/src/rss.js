const Feed = require('feed').Feed;
const showdown = require('showdown');
const { writeFileSync, readFileSync } = require('fs');
const { join } = require('path');
const { log, logError, yellow } = require('@scullyio/scully');
const asciidoctor = require('asciidoctor.js')();

const configFile = readFileSync(`${process.cwd()}/rss.config.json`, 'utf8');
const config = JSON.parse(configFile.toString());
const blogPostRouteSlug = config.blogPostRouteSlug || '/blog';
const filename = config.filename || 'feed';
const markupLanguage = config.markupLanguage || 'markdown';
const feed = new Feed(config);

config.categories.forEach((cat) => {
  feed.addCategory(cat);
});

const rssPlugin = (routes) => {
  log('Started @notiz/scully-plugin-rss');

  const blogPosts = routes.filter(
    (r) =>
      r && r.data && r.data.published && r.route.includes(blogPostRouteSlug)
  );

  if (config.newestPostsFirst) {
    blogPosts.sort((a, b) => {
      return a.data.publishedAt > b.data.publishedAt ? -1 : 1;
    });
  } else {
    blogPosts.sort((a, b) => {
      return a.data.publishedAt > b.data.publishedAt ? 1 : -1;
    });
  }

  log(
    `Generating RSS Feed for ${yellow(blogPosts.length)} published blog ${
      blogPosts.length === 1 ? 'post' : 'posts'
    }`
  );

  blogPosts.forEach((r) => {
    const item = createFeedItemFromRoute(r);
    feed.addItem(item);
  });
  try {
    writeFileSync(join(config.outDir || '', `${filename}.xml`), feed.rss2());
    log(`✅ Created ${yellow(config.outDir + `/${filename}.xml`)}`);
    writeFileSync(join(config.outDir || '', `${filename}.atom`), feed.atom1());
    log(`✅ Created ${yellow(config.outDir + `/${filename}.atom`)}`);
    writeFileSync(join(config.outDir || '', `${filename}.json`), feed.json1());
    log(`✅ Created ${yellow(config.outDir + `/${filename}.json`)}`);
  } catch (error) {
    logError('❌ Failed to create RSS feed. Error:', error);
    throw error;
  }

  log('Finished @notiz/scully-plugin-rss');
};

const createFeedItemFromRoute = (route) => {
  let item;
  try {
    if (route.data.published) {
      const articleString = readFileSync(route.templateFile, 'utf8').toString();

      const article = articleString.slice(
        nth_occurrence(articleString, '---', 2) + 3,
        articleString.length - 1
      );

      const articleHTML = '';
      if (markupLanguage === 'asciidoc') {
        articleHTML = asciidoctor.convert(article);
      } else {
        articleHTML = new showdown.Converter().makeHtml(article);
      }

      item = {
        title: route.data.title,
        id: route.route,
        link: config.link + route.route,
        description: route.data.description,
        content: articleHTML,
        author: route.data.authors
          ? route.data.authors.map((a) => ({ name: a }))
          : [],
        contributor: route.data.authors
          ? route.data.authors.map((a) => ({
              name: a.toLowerCase().replace(' ', '-'),
            }))
          : [],
        date: route.data.updatedAt
          ? route.data.updatedAt
          : route.data.publishedAt,
        image: route.data.twitterBanner,
      };
    }
  } catch (err) {
    logError(`Error during feed item creation ${route.data.route}`, err);
  }

  return item;
};

function nth_occurrence(text, searchString, nth) {
  const firstIndex = text.indexOf(searchString);
  const lengthUpToFirstIndex = firstIndex + 1;

  if (nth === 1) {
    return firstIndex;
  } else {
    const stringAfterFirstOccurrence = text.slice(lengthUpToFirstIndex);
    const nextOccurrence = nth_occurrence(
      stringAfterFirstOccurrence,
      searchString,
      nth - 1
    );

    if (nextOccurrence === -1) {
      return -1;
    } else {
      return lengthUpToFirstIndex + nextOccurrence;
    }
  }
}

module.exports = {
  rssPlugin,
};
