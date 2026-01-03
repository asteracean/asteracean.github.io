import { type CollectionEntry, getCollection } from 'astro:content';

export type PublishedPost = CollectionEntry<'posts'> & { data: { published: Date; }; };

const isPostPublished = (
  post: CollectionEntry<'posts'>,
): post is PublishedPost => post.data.published !== undefined;

export const getPostsCollection = async () => {
  const publishedPosts = await getCollection('posts', isPostPublished);
  publishedPosts.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
  return publishedPosts;
};

export const getPostUrl = (post: PublishedPost) =>
  `/${post.data.published.toLocaleString('en-CA', { year: 'numeric' })}/${
    post.data.published.toLocaleString('en-CA', { month: '2-digit' })
  }/${post.data.published.toLocaleString('en-CA', { day: '2-digit' })}/${post.slug}/`;

export interface Category {
  name: string;
  slug: string;
}

export const getCategoryUrl = (category: Category) => `/categories/${category.slug}/`;
