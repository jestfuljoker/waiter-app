import { useState, type ReactElement, useCallback } from 'react';

import type { Order } from '~/@types/global';

import { OrderModal } from '../OrderModal';
import * as S from './styles';

interface OrdersBoardProps {
	icon: string;
	title: string;
	orders: Order[];
}

export function OrdersBoard({ icon, title, orders }: OrdersBoardProps): ReactElement {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

	function handleOpenOrder(order: Order) {
		setIsModalVisible(true);
		setSelectedOrder(order);
	}

	const handleCloseModal = useCallback(() => {
		setIsModalVisible(false);
		setSelectedOrder(null);
	}, []);

	return (
		<S.Container>
			<OrderModal order={selectedOrder} visible={isModalVisible} onClose={handleCloseModal} />

			<header>
				<span>{icon}</span>
				<strong>{title}</strong>
				<span>({orders.length})</span>
			</header>

			{orders.length > 0 && (
				<S.OrdersContainer>
					{orders.map((order) => (
						<button
							onClick={() => {
								handleOpenOrder(order);
							}}
							type="button"
							key={order.id}
						>
							<strong>Mesa {order.table}</strong>
							<span>{order.products.length} items</span>
						</button>
					))}
				</S.OrdersContainer>
			)}
		</S.Container>
	);
}
