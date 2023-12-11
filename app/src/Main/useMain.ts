import { useEffect, useState } from 'react';

import type { CartItem } from '~/components/Cart';
import type { Category } from '~/service/requests/categories';
import { CategoriesService } from '~/service/requests/categories';
import type { Product } from '~/service/requests/products';
import { ProductsService } from '~/service/requests/products';

export function useMain() {
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectedTable] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingProducts, setIsLoadingProducts] = useState(false);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		Promise.all([CategoriesService.listCategories(), ProductsService.listProducts()]).then(
			([categoriesResponse, productsResponse]) => {
				setCategories(categoriesResponse);
				setProducts(productsResponse);
				setIsLoading(false);
			},
		);
	}, []);

	async function handleSelectCategory(categoryId: string) {
		let loadedProducts: Product[] = [];

		setIsLoadingProducts(true);

		loadedProducts = categoryId
			? await ProductsService.listProductsByCategoryId(categoryId)
			: await ProductsService.listProducts();

		setProducts(loadedProducts);
		setIsLoadingProducts(false);
	}

	function handleSaveTable(table: string) {
		setSelectedTable(table);
	}

	function handleResetOrder() {
		setSelectedTable('');
		setCartItems([]);
	}

	function handleAddToCart(product: Product) {
		if (!selectedTable) {
			setIsTableModalVisible(true);
		}

		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex((cartItem) => cartItem.product.id === product.id);

			if (itemIndex < 0) {
				return [...prevState, { product, quantity: 1 }];
			}

			const newCartItems = [...prevState];

			const item = newCartItems[itemIndex];

			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity + 1,
			};

			return newCartItems;
		});
	}

	function handleDecrementCartItem(product: Product) {
		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex((cartItem) => cartItem.product.id === product.id);

			const item = prevState[itemIndex];
			const newCartItems = [...prevState];

			if (item.quantity === 1) {
				newCartItems.splice(itemIndex, 1);
				return newCartItems;
			}

			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity - 1,
			};

			return newCartItems;
		});
	}

	return {
		products,
		cartItems,
		isLoading,
		categories,
		selectedTable,
		isLoadingProducts,
		isTableModalVisible,
		handleAddToCart,
		handleSaveTable,
		handleResetOrder,
		handleSelectCategory,
		setIsTableModalVisible,
		handleDecrementCartItem,
	};
}
