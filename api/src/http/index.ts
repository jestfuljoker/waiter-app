import fastify from 'fastify';
// import socket from 'fastify-socket.io';

import { logger } from '~/utils';

import { router } from './routes';

export async function buildServer() {
	const app = fastify({ logger });

	app.addHook('onSend', (_, reply, __, done) => {
		reply.header('Access-Control-Allow-Origin', '*');
		reply.header('Access-Control-Allow-Methods', '*');
		reply.header('Access-Control-Allow-Headers', '*');
		done();
	});

	// app.register(socket);

	app.register(router, { prefix: '/api' });

	return app;
}
