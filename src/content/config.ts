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
        tags: z.array(z.string()).optional(),
        publish: z.boolean()
    })
});

const logCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    title: z.string(),
    author: z.string(),
    type: z.string(),
    publish: z.boolean()
  })
})

export const collections = {
  articles: postsCollection,
  siteLogs: logCollection
};
