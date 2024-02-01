import { env } from './config/env';
import { buildServer } from './http';
import { logger } from './utils';

async function gracefulShutdown({ app }: { app: Awaited<ReturnType<typeof buildServer>> }) {
	await app.close();
}

async function main() {
	const app = await buildServer();

	logger.debug(env, 'using env');

	await app.listen({ port: env.PORT, host: env.HOST });

	const signals = ['SIGINT', 'SIGTERM'];

	for (const signal of signals) {
		process.on(signal, () => gracefulShutdown({ app }));
	}
}

main();
