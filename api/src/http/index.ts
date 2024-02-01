import fastify from 'fastify';

import { logger } from '~/utils';

export async function buildServer() {
	const app = fastify({ logger });

	return app;
}
