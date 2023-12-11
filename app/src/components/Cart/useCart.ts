import { useState } from 'react';

import type { CreateOrderPayload } from '~/service/requests/orders';
import { OrdersService } from '~/service/requests/orders';

import type { CartItem } from '.';

interface UseCartProps {
	cartItems: CartItem[];
	selectedTable: string;
	onConfirmOrder: () => void;
}

export function useCart({ cartItems, onConfirmOrder, selectedTable }: UseCartProps) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const total = cartItems.reduce((accumulator, cartItem) => {
		return accumulator + cartItem.quantity * cartItem.product.price;
	}, 0);

	async function handleConfirmOrder() {
		const payload: CreateOrderPayload = {
			table: selectedTable,
			products: cartItems.map((cartItem) => ({
				product: cartItem.product.id,
				quantity: cartItem.quantity,
			})),
		};

		setIsLoading(true);

		await OrdersService.createOrder(payload);

		setIsLoading(false);
		setIsModalVisible(true);
	}

	function handleOk() {
		setIsModalVisible(false);
		onConfirmOrder();
	}

	return {
		isModalVisible,
		isLoading,
		total,
		handleConfirmOrder,
		handleOk,
	};
}
