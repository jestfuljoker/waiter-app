import { drizzle } from 'drizzle-orm/node-postgres';
import * as pg from 'pg';

import type * as schemas from '~/config/db/schemas';
import { env } from '~/config/env';

const pool = new pg.Pool({ connectionString: env.DATABASE_URL });

export const db = drizzle<typeof schemas>(pool);
