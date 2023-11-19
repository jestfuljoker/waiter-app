import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { createCategory, listCategories } from './useCases/categories';

export const router = Router();

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

router.get('/categories', listCategories);
router.post('/categories', createCategory);

router.get('/categories/:categoryId/products', (req, res) => {
	res.send('categories products');
});

router.get('/products', (req, res) => {
	res.send('products');
});

router.post('/products', (req, res) => {
	res.send('products');
});

router.get('/orders', (req, res) => {
	res.send('orders');
});

router.patch('/orders/:orderId', (req, res) => {
	res.send('orders');
});

router.delete('/orders/:orderId', (req, res) => {
	res.send('orders');
});
