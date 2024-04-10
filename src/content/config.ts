import { z, defineCollection } from "astro:content";

// const postsCollection = defineCollection({
//     type: 'content',
//     schema: z.object({
//         title: z.string(),
//         pubDate: z.date(),
//         description: z.string(),
//         imageUrl: z.string().url(),
//         author: z.string(),
//         type: z.string(),
//         slug: z.string().optional(),
//         tags: z.array(z.string())
//     })
// });

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    }),
    description: z.string(),
    imageUrl: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
