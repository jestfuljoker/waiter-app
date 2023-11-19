import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import { router } from './router';

const PORT = 3001;

mongoose
	.connect('mongodb://localhost:27017/test')
	.then(() => {
		console.log('📚 MongoDB connected!!!');

		const app = express();

		app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
		app.use(express.json());

		app.use(router);

		app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
	})
	.catch((err) => console.error('Error connecting to MongoDB: ', err));
