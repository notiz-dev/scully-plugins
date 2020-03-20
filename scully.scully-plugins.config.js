require('./plugins/lazy-images');
require('./plugins/fouc');

exports.config = {
  projectRoot: './src',
  projectName: 'scully-plugins',
  defaultPostRenderers: ['lazyImages', 'fouc'],
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/blog'
      }
    }
  }
};
