const { registerPlugin } =  require('@scullyio/scully');
const { lazyImagesPlugin } =  require('./lazy-images');

const validator = async () => [];
registerPlugin('postProcessByHtml', 'lazyImages', lazyImagesPlugin, validator);