const Feed = require('feed').Feed;
const { writeFileSync, readFileSync } = require('fs');
const { join } = require('path');
let config;
let feed;
const rssPlugin = async (html, route) => {
  try {
    if (!config) {
      const configFile = readFileSync(
        `${process.cwd()}/rss.config.json`,
        'utf8'
      );
      config = JSON.parse(configFile.toString());
      feed = new Feed(config);
      config.categories.forEach(cat => {
        feed.addCategory(cat);
      });
    }
    const mdString = readFileSync(route.templateFile, 'utf8')
      .toString()

      const md = mdString.slice(nth_occurrence(mdString, '---', 2) + 3, mdString.length - 1);

    const item = {
      title: route.data.title,
      id: route.route,
      link: route.route,
      description: route.data.description,
      content: md,
      author: route.data.authors.map(a => ({ name: a })),
      contributor: route.data.authors.map(a => ({
        name: a.toLowerCase().replace(' ', '-')
      })),
      date: route.data.updatedAt || route.data.publishedAt,
      image: route.data.twitterBanner
    };
    feed.addItem(item);
    writeFileSync(join(config.outDir || '', 'feed.xml'), feed.rss2());
    writeFileSync(join(config.outDir || '', 'feed.atom'), feed.atom1());
    writeFileSync(join(config.outDir || '', 'feed.json'), feed.json1());
  } catch (err) {
    console.error(err);
  }

  return html;
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
  rssPlugin
};
