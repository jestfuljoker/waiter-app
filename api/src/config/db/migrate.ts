import chalk from 'chalk';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import { db } from '~/config/db/connection';

async function runMigrations() {
	console.log(chalk.yellowBright('Started applying migrations...'));

	await migrate(db, { migrationsFolder: './src/config/db/migrations' });

	console.log(chalk.greenBright('Migrations applied successfully!'));
	process.exit(0);
}

runMigrations();
