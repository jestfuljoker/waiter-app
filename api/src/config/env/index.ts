import zennv from 'zennv';
import { z } from 'zod';

export const env = zennv({
	dotenv: true,
	schema: z.object({
		NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
		DATABASE_URL: z.string(),
		PORT: z.coerce.number().default(3333),
		HOST: z.string(),
	}),
});
