require('./plugins/lazy-images');
require('./plugins/fouc');
require('./plugins/medium-zoom');
require('./plugins/rss');

exports.config = {
  projectRoot: './src',
  projectName: 'scully-plugins',
  defaultPostRenderers: ['fouc', 'seoHrefOptimise', 'rss'],
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/blog',
      },
      postRenderers: [
        'fouc',
        'seoHrefOptimise',
        'rss',
        'lazyImages',
        'mediumZoom',
      ],
    },
    '/docs/:slug': {
      type: 'contentFolder',
      slug: { folder: './content/docs' },
    },
  },
};
