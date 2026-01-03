import { defineCollection, z } from 'astro:content';
import slugify from 'slugify';

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      published: z.coerce.date().optional(),
      updated: z.coerce.date().optional(),
      cover: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      categories: z.array(
        z.string().transform((name) => (
          { name, slug: slugify(name, { lower: true }) }
        )),
      ).optional(),
    }),
});

export const collections = { posts };
