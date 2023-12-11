import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { OrderStatus, type Order } from '~/service/requests/orders';
import { OrdersService } from '~/service/requests/orders/service';

interface UseOrdersBoardProps {
	onCancelOrder: (orderId: string) => void;
	onOrderStatusChange: (orderId: string, status: OrderStatus) => void;
}

export function useOrdersBoard({ onCancelOrder, onOrderStatusChange }: UseOrdersBoardProps) {
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

		await OrdersService.cancelOrder(selectedOrder!.id);

		onCancelOrder(selectedOrder!.id);
		setIsLoading(false);
		setIsModalVisible(false);
		toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado com sucesso!`);
	}

	async function handleChangeOrderStatus() {
		setIsLoading(true);

		const status =
			selectedOrder?.status === OrderStatus.WAITING ? OrderStatus.IN_PRODUCTION : OrderStatus.DONE;

		await OrdersService.changeOrderStatus(selectedOrder!.id, status);

		toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado com sucesso!`);
		onOrderStatusChange(selectedOrder!.id, status);
		setIsLoading(false);
		setIsModalVisible(false);
	}

	return {
		isLoading,
		selectedOrder,
		isModalVisible,
		handleCloseModal,
		handleOpenOrder,
		handleCancelOrder,
		handleChangeOrderStatus,
	};
}
