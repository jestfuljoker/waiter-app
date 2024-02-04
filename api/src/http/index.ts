import fastify from 'fastify';
// import socket from 'fastify-socket.io';
import {
	type ZodTypeProvider,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod';

import { errorHandlerPlugin } from '~/shared/errors/error-handler-plugin';
import { logger } from '~/utils';

import { router } from './routes';

export async function buildServer() {
	const app = fastify({ logger });

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.addHook('onSend', (_, reply, __, done) => {
		reply.header('Access-Control-Allow-Origin', '*');
		reply.header('Access-Control-Allow-Methods', '*');
		reply.header('Access-Control-Allow-Headers', '*');
		done();
	});

	// app.register(socket);

	app.withTypeProvider<ZodTypeProvider>().register(router, { prefix: '/api' });

	app.setErrorHandler(errorHandlerPlugin);

	return app;
}
