import { useState, type ReactElement, useCallback } from 'react';
import { toast } from 'react-toastify';

import { OrderStatus, type Order } from '~/@types/global';
import { api } from '~/service/api';

import { OrderModal } from '../OrderModal';
import * as S from './styles';

interface OrdersBoardProps {
	icon: string;
	title: string;
	orders: Order[];
	onCancelOrder: (orderId: string) => void;
	onOrderStatusChange: (orderId: string, status: OrderStatus) => void;
}

export function OrdersBoard({
	icon,
	title,
	orders,
	onCancelOrder,
	onOrderStatusChange,
}: OrdersBoardProps): ReactElement {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

	function handleOpenOrder(order: Order) {
		setIsModalVisible(true);
		setSelectedOrder(order);
	}

	const handleCloseModal = useCallback(() => {
		setIsModalVisible(false);
		setSelectedOrder(null);
	}, []);

	async function handleCancelOrder() {
		setIsLoading(true);

		await api.delete(`/orders/${selectedOrder?.id}`);

		onCancelOrder(selectedOrder!.id);
		setIsLoading(false);
		setIsModalVisible(false);
		toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado com sucesso!`);
	}

	async function handleChangeOrderStatus() {
		setIsLoading(true);

		const status =
			selectedOrder?.status === OrderStatus.WAITING ? OrderStatus.IN_PRODUCTION : OrderStatus.DONE;

		await api.patch(`/orders/${selectedOrder?.id}`, {
			status,
		});

		toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado com sucesso!`);
		onOrderStatusChange(selectedOrder!.id, status);
		setIsLoading(false);
		setIsModalVisible(false);
	}

	return (
		<S.Container>
			<OrderModal
				order={selectedOrder}
				visible={isModalVisible}
				onClose={handleCloseModal}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleChangeOrderStatus}
				isLoading={isLoading}
			/>

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
