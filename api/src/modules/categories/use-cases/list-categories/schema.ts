import { z } from 'zod';

import { fieldIsRequired } from '~/utils';

export const listCategoriesSchema = z.object({
	page: z.coerce.number(),
	limit: z.coerce.number(),
	name: z
		.string({ required_error: fieldIsRequired('Nome') })
		.trim()
		.min(1, fieldIsRequired('Nome'))
		.optional(),
});

export type ListCategoryQueryString = z.infer<typeof listCategoriesSchema>;

export const listCategoryJsonSchema = {
	querystring: listCategoriesSchema,
};
