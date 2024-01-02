import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';

import { createCategory, listCategories, listProductsByCategory } from './useCases/categories';
import { cancelOrder, changeOrderStatus, createOrder, listOrders } from './useCases/orders';
import { createProduct, listProducts } from './useCases/products';

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
router.get('/categories/:categoryId/products', listProductsByCategory);

router.get('/products', listProducts);
router.post('/products', upload.single('image'), createProduct);

router.get('/orders', listOrders);
router.post('/orders', createOrder);
router.patch('/orders/:orderId', changeOrderStatus);
router.delete('/orders/:orderId', cancelOrder);
