import { z } from 'zod';

import { fieldIsRequired } from '~/utils';

const createCategorySchema = z.object({
	name: z
		.string({ required_error: fieldIsRequired('Nome') })
		.trim()
		.min(1, fieldIsRequired('Nome')),
	icon: z
		.string({ required_error: fieldIsRequired('Ícone') })
		.trim()
		.min(1, fieldIsRequired('Ícone')),
});

export type CreateCategoryBody = z.infer<typeof createCategorySchema>;

export const createCategoryJsonSchema = {
	body: createCategorySchema,
};
