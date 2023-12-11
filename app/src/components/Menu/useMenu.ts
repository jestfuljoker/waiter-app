import { useState } from 'react';

import { type Product } from '~/service/requests/products';

export function useMenu() {
	const [isProductModalVisible, setIsProductModalVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	function handleOpenModal(product: Product) {
		setIsProductModalVisible(true);
		setSelectedProduct(product);
	}

	return { selectedProduct, isProductModalVisible, handleOpenModal, setIsProductModalVisible };
}
