import { env } from '~/config/env';
import { type Config } from 'drizzle-kit';

export default {
	schema: './src/config/db/schemas/index.ts',
	out: './src/config/db/migrations',
	driver: 'mysql2',
	dbCredentials: {
		uri: env.MYSQL_URI,
	},
} satisfies Config;
