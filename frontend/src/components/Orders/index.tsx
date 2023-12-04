import { useState, type ReactElement, useEffect } from 'react';

import { OrderStatus, type Order } from '~/@types/global';
import { api } from '~/service/api';

import { OrdersBoard } from '../OrdersBoard';
import * as S from './styles';

export function Orders(): ReactElement {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		async function fetchOrders() {
			const { data } = await api.get<Order[]>('/orders');

			setOrders(data);
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

	return (
		<S.Container>
			<OrdersBoard
				onOrderStatusChange={handleOrderStatusChange}
				onCancelOrder={handleCancelOrder}
				icon="🕑"
				title="Pedidos"
				orders={waiting}
			/>
			<OrdersBoard
				onOrderStatusChange={handleOrderStatusChange}
				onCancelOrder={handleCancelOrder}
				icon="👨‍🍳"
				title="Em preparação"
				orders={inProduction}
			/>
			<OrdersBoard
				onOrderStatusChange={handleOrderStatusChange}
				onCancelOrder={handleCancelOrder}
				icon="✅"
				title="Pronto"
				orders={done}
			/>
		</S.Container>
	);
}
