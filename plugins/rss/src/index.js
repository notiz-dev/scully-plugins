const { registerPlugin } = require('@scullyio/scully');
const { rssPlugin } = require('./rss');

const validator = async () => [];
registerPlugin('render', 'rss', rssPlugin, validator);
