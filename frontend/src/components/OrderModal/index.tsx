import { OrderStatus, type Order } from '~/@types/global';
import closeIcon from '~/assets/images/close-icon.svg';
import { formatCurrency } from '~/utils';

import * as S from './styles';
import { useOrderModal } from './useOrderModal';

interface OrderModalProps {
	visible: boolean;
	order: Order | null;
	onClose: () => void;
	onCancelOrder: () => Promise<void>;
	onChangeOrderStatus(): Promise<void>;
	isLoading: boolean;
}

const orderStatusMap = {
	[OrderStatus.WAITING]: {
		title: 'Fila de espera',
		icon: '🕑',
	},
	[OrderStatus.IN_PRODUCTION]: {
		title: 'Em preparação',
		icon: '👨‍🍳',
	},
	[OrderStatus.DONE]: {
		title: 'Pronto',
		icon: '✅',
	},
};

export function OrderModal({
	visible,
	order,
	isLoading,
	onClose,
	onCancelOrder,
	onChangeOrderStatus,
}: OrderModalProps) {
	const { elementRef, shouldRender, total } = useOrderModal({ order, visible, onClose });

	return shouldRender ? (
		<S.Overlay $isLeaving={!visible} ref={elementRef} onClick={onClose}>
			<S.Body $isLeaving={!visible} onClick={(event) => event.stopPropagation()}>
				<header>
					<strong>Mesa {order?.table}</strong>
					<button type="button" onClick={onClose}>
						<img src={closeIcon} alt="Ícone de fechar o modal" />
					</button>
				</header>

				<S.StatusContainer>
					<small>Status do pedido</small>
					<div>
						<span>{orderStatusMap[order?.status as OrderStatus]?.icon}</span>
						<strong>{orderStatusMap[order?.status as OrderStatus]?.title}</strong>
					</div>
				</S.StatusContainer>

				<S.OrderDetails>
					<strong>Items</strong>

					<div className="order-items">
						{order?.products.map(({ id, product, quantity }) => (
							<div className="item" key={id}>
								<img
									width="48"
									height="40"
									src={`http://localhost:3001/uploads/${product.imagePath}`}
									alt={product.name}
								/>

								<span className="quantity">{quantity} x</span>

								<div className="product-details">
									<strong>{product.name}</strong>
									<span>{formatCurrency(product.price)}</span>
								</div>
							</div>
						))}
					</div>

					<div className="total">
						<span>Total</span>
						<strong>{formatCurrency(total)}</strong>
					</div>
				</S.OrderDetails>

				<S.Actions>
					{order?.status !== OrderStatus.DONE && (
						<button
							onClick={onChangeOrderStatus}
							disabled={isLoading}
							type="button"
							className="primary"
						>
							<span>{order?.status === OrderStatus.WAITING ? '👨‍🍳' : '✅'}</span>
							<strong>
								{order?.status === OrderStatus.WAITING ? 'Iniciar Produção' : 'Concluir Pedido'}
							</strong>
						</button>
					)}

					<button disabled={isLoading} onClick={onCancelOrder} type="button" className="secondary">
						<strong>Cancelar pedido</strong>
					</button>
				</S.Actions>
			</S.Body>
		</S.Overlay>
	) : null;
}
