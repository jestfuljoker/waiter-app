import type { ReactElement } from 'react';

import type { OrderStatus } from '~/@types/global';
import type { Order } from '~/@types/global';

import { OrderModal } from '../OrderModal';
import * as S from './styles';
import { useOrdersBoard } from './useOrdersBoard';

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
	const {
		isLoading,
		selectedOrder,
		isModalVisible,
		handleCloseModal,
		handleOpenOrder,
		handleCancelOrder,
		handleChangeOrderStatus,
	} = useOrdersBoard({ onCancelOrder, onOrderStatusChange });

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
