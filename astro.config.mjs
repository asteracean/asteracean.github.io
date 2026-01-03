// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import externalLinks from 'rehype-external-links';
import smartypants from 'remark-smartypants';

// https://astro.build/config
export default defineConfig({
  site: 'https://aster.ac',
  integrations: [mdx(), sitemap()],
  markdown: {
    smartypants: false,
    remarkPlugins: [
      // @ts-expect-error types don't match, but this works at runtime
      [smartypants, { dashes: 'oldschool' }],
    ],
    rehypePlugins: [
      [externalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
  vite: {},
});
