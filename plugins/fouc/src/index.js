const { registerPlugin } = require('@scullyio/scully');
const { foucPlugin } = require('./fouc');

const validator = async () => [];
registerPlugin('postProcessByHtml', 'fouc', foucPlugin, validator);
