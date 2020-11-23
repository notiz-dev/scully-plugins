const dayjs = require('dayjs');
const Feed = require('feed').Feed;
const showdown = require('showdown');
const { writeFileSync, readFileSync } = require('fs');
const { join } = require('path');

const configFile = readFileSync(`${process.cwd()}/rss.config.json`, 'utf8');
const config = JSON.parse(configFile.toString());
const blogPostRouteSlug = config.blogPostRouteSlug || '/blog';
const feed = new Feed(config);

const { log, yellow } = require('@scullyio/scully');

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
  writeFileSync(join(config.outDir || '', 'feed.xml'), feed.rss2());
  log(`✅ Created ${yellow(config.outDir + '/feed.xml')}`);
  writeFileSync(join(config.outDir || '', 'feed.atom'), feed.atom1());
  log(`✅ Created ${yellow(config.outDir + '/feed.atom')}`);
  writeFileSync(join(config.outDir || '', 'feed.json'), feed.json1());
  log(`✅ Created ${yellow(config.outDir + '/feed.atom')}`);

  log('Finished @notiz/scully-plugin-rss');
};

const createFeedItemFromRoute = (route) => {
  let item;
  try {
    if (route.data.published) {
      const mdString = readFileSync(route.templateFile, 'utf8').toString();

      const md = mdString.slice(
        nth_occurrence(mdString, '---', 2) + 3,
        mdString.length - 1
      );
      const articleHTML = new showdown.Converter().makeHtml(md);

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
          ? dayjs(route.data.updatedAt).toDate()
          : dayjs(route.data.publishedAt).toDate(),
        image: route.data.twitterBanner,
      };
    }
  } catch (err) {
    console.error(err);
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
