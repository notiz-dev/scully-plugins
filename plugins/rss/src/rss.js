const { scullyConfig } = require('@scullyio/scully/utils/config');
const RSS = require('rss');
const { writeFile } = require('fs');
const { promisify } = require('util');
const { join } = require('path');
const writeFileAsync = promisify(writeFile);
const config = scullyConfig.rssConfig || {
  title: 'RSS Feed',
  site_url: 'https://example.com',
  feed_url: 'https://example.com/feed'
};

const feed = new RSS(config);
const rssPlugin = async (html, route) => {

  const item = {
    date: route.data.updatedAt || route.data.publishedAt,
    description: route.data.description || '',
    title: route.data.title || '',
    url: `${config.site_url}/${route.route}`,
    categories: route.data.categories || route.data.tags,
    author: route.data.author || route.data.authors[0]
  };
  feed.item(item);
  await writeFileAsync(join(scullyConfig.outDir || '', 'feed.xml'), feed.xml());
  return html;
};

module.exports = {
  rssPlugin
};
