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

const servicesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/services" }),
  schema: z.object({
    title: z.string(),
    serviceName: z.string(),
    category: z.enum(["Compute", "Storage", "Database", "Networking", "Security", "Other"]),
    description: z.string(),
  }),
});

export const collections = {
  modules: modulesCollection,
  services: servicesCollection,
};
