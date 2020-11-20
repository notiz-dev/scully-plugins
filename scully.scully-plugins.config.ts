import { ScullyConfig } from '@scullyio/scully';
import '@notiz/scully-plugin-lazy-images';
import '@notiz/scully-plugin-fouc';
import '@notiz/scully-plugin-rss';
import '@notiz/scully-plugin-medium-zoom';

const defaultPostRenderers = [
  'fouc',
  'seoHrefOptimise',
  'lazyImages',
  'mediumZoom',
];

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'scully-plugins',
  defaultPostRenderers,
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/blog',
      },
      postRenderers: [...defaultPostRenderers],
    },
    '/docs/:slug': {
      type: 'contentFolder',
      slug: { folder: './content/docs' },
      postRenderers: [...defaultPostRenderers],
    },
  },
};
