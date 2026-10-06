import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string().max(120),
    description: z.string().max(220),
    date: z.coerce.date(),
    author: z.string().default('IPJunction'),
    topics: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/changelog' }),
  schema: z.object({
    title: z.string().max(120),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const careers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/careers' }),
  schema: z.object({
    title: z.string().max(120),
    location: z.string(),
    type: z.enum(['Full-time', 'Contract', 'Part-time']),
    summary: z.string().max(220),
    date: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { insights, changelog, careers };
