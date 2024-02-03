import { type FastifyInstance } from 'fastify';
import multer from 'multer';
import path from 'node:path';

import { createProduct, listProducts } from '~/http/use-cases/products';

const upload = multer({
	storage: multer.diskStorage({
		destination(_, __, callback) {
			callback(null, path.resolve(__dirname, '..', 'uploads'));
		},
		filename(_, file, callback) {
			callback(null, `${Date.now()}-${file.originalname}`);
		},
	}),
});

export async function productRouter(app: FastifyInstance) {
	app.get('/', listProducts);
	app.post('/', upload.single('image'), createProduct);
}
