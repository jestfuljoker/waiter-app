import { z } from 'zod';

import { fieldIsRequired } from '~/utils';

export const listProductsSchema = z.object({
	page: z.coerce.number(),
	limit: z.coerce.number(),
	name: z
		.string({ required_error: fieldIsRequired('Nome') })
		.trim()
		.min(1, fieldIsRequired('Nome'))
		.optional(),
});

export type ListProductQueryString = z.infer<typeof listProductsSchema>;

export const listProductJsonSchema = {
	querystring: listProductsSchema,
};
