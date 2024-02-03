import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const createCategorySchema = z.object({
	name: z.string(),
	icon: z.string(),
});

export type CreateCategoryBody = z.infer<typeof createCategorySchema>;

export const createCategoryJsonSchema = {
	body: zodToJsonSchema(createCategorySchema, 'createCategorySchema'),
};
