import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { type Order } from '~/service/requests/orders';
import { OrderStatus } from '~/service/requests/orders';
import { OrdersService } from '~/service/requests/orders/service';

export function useOrders() {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		const socket = socketIo('http://localhost:3001', {
			transports: ['websocket'],
		});

		socket.on('orders@new', (order) => setOrders((prevState) => [...prevState, order]));
	}, []);

	useEffect(() => {
		async function fetchOrders() {
			const loadedOrders = await OrdersService.listOrders();

			setOrders(loadedOrders);
		}

		fetchOrders();
	}, []);

	const waiting = orders.filter((order) => order.status === OrderStatus.WAITING);
	const inProduction = orders.filter((order) => order.status === OrderStatus.IN_PRODUCTION);
	const done = orders.filter((order) => order.status === OrderStatus.DONE);

	function handleCancelOrder(orderId: string) {
		setOrders((prevState) => prevState.filter((stateOrder) => stateOrder.id !== orderId));
	}

	function handleOrderStatusChange(orderId: string, status: OrderStatus) {
		setOrders((prevState) =>
			prevState.map((order) => (order.id === orderId ? { ...order, status } : order)),
		);
	}

	return {
		done,
		waiting,
		inProduction,
		handleCancelOrder,
		handleOrderStatusChange,
	};
}
