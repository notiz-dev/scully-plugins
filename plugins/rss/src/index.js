const { registerPlugin } = require('@scullyio/scully');
const { rssPlugin } = require('./rss');

const validator = async () => [];
registerPlugin('routeDiscoveryDone', 'rss', rssPlugin, validator);
