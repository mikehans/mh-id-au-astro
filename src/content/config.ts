import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        author: z.string(),
        type: z.string(),
        tags: z.array(z.string()).optional()
    })
});

export const collections = {
  articles: postsCollection,
};
