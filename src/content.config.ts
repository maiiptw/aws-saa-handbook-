import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const modulesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/modules" }),
  schema: z.object({
    title: z.string(),
    moduleNumber: z.number(),
    description: z.string(),
    tags: z.array(z.string()),
    lastUpdated: z.date(),
  }),
});

export const collections = {
  modules: modulesCollection,
};
