import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { siteDescription, siteTitle } from 'src/constants';
import { getCategoryUrl, getPostsCollection, getPostUrl } from 'src/content';

export const GET: APIRoute = async (context) => {
  const posts = await getPostsCollection();
  if (!context.site) return new Response(null, { status: 404 });

  return rss({
    title: siteTitle,
    description: siteDescription,
    site: context.site,
    items: posts.map((post) => ({
      link: getPostUrl(post),
      title: post.data.title,
      pubDate: post.data.published,
      description: post.data.description,
      categories: post.data.categories?.map((category) => getCategoryUrl(category)),
    })),
  });
};
