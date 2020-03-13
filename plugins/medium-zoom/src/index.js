const { registerPlugin } = require('@scullyio/scully');
const { mediumZoomPlugin } = require('./medium-zoom');

const validator = async () => [];
registerPlugin('render', 'mediumZoom', mediumZoomPlugin, validator);
