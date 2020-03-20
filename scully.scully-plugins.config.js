require('./plugins/lazy-images');
require('./plugins/fouc');
require('./plugins/medium-zoom');

exports.config = {
  projectRoot: './src',
  projectName: 'scully-plugins',
  defaultPostRenderers: ['fouc'],
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/blog'
      },
      postRenderers: ['fouc', 'mediumZoom']
    }
  }
};
