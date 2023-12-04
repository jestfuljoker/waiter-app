import express from 'express';
import path from 'node:path';

import { connect } from './app/database';
import { router } from './router';

const PORT = 3001;

connect(() => {
	const app = express();

	app.use((_, response, next) => {
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Access-Control-Allow-Methods', '*');
		response.setHeader('Access-Control-Allow-Headers', '*');

		next();
	});
	app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
	app.use(express.json());

	app.use(router);

	app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
});
