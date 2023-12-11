import { type ReactElement } from 'react';

import { OrdersBoard } from '../OrdersBoard';
import * as S from './styles';
import { useOrders } from './useOrders';

export function Orders(): ReactElement {
	const { done, waiting, inProduction, handleCancelOrder, handleOrderStatusChange } = useOrders();

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
