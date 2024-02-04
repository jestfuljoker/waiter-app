import { z } from 'zod';

import { fieldIsRequired } from '~/utils';

const createProductSchema = z.object({
	name: z
		.string({ required_error: fieldIsRequired('Nome') })
		.trim()
		.min(1, fieldIsRequired('Nome')),
	description: z
		.string({ required_error: fieldIsRequired('Descrição') })
		.trim()
		.min(1, fieldIsRequired('Descrição')),
	price: z
		.number({ required_error: fieldIsRequired('Preço') })
		.min(1, fieldIsRequired('Preço'))
		.transform((price) => String(price)),
	categoryId: z
		.string({ required_error: fieldIsRequired('Categoria') })
		.cuid2(fieldIsRequired('Categoria'))
		.nullable()
		.optional(),
});

export type CreateProductBody = z.infer<typeof createProductSchema>;

export const createProductJsonSchema = {
	body: createProductSchema,
};
