import { FlatList, TouchableOpacity } from 'react-native';

import { type Product } from '~/service/requests/products';
import { formatCurrency } from '~/utils/formatCurrency';

import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { Text } from '../Text';
import * as S from './styles';
import { useCart } from './useCart';

export interface CartItem {
	product: Product;
	quantity: number;
}

interface CartProps {
	cartItems: CartItem[];
	selectedTable: string;
	onAddToCart: (product: Product) => void;
	onDecrementCartItem: (product: Product) => void;
	onConfirmOrder: () => void;
}

export function Cart({
	cartItems,
	selectedTable,
	onAddToCart,
	onDecrementCartItem,
	onConfirmOrder,
}: CartProps) {
	const { isModalVisible, isLoading, total, handleOk, handleConfirmOrder } = useCart({
		cartItems,
		selectedTable,
		onConfirmOrder,
	});

	return (
		<>
			<OrderConfirmedModal visible={isModalVisible} onOk={handleOk} />

			{cartItems.length > 0 && (
				<FlatList
					data={cartItems}
					style={{ marginBottom: 20, maxHeight: 150 }}
					keyExtractor={(cartItem) => cartItem.product.id}
					showsVerticalScrollIndicator={false}
					renderItem={({ item: cartItem }) => (
						<S.CartItem>
							<S.ProductContainer>
								<S.Image
									source={{ uri: `http://192.168.0.20:3001/uploads/${cartItem.product.imagePath}` }}
								/>

								<S.QuantityContainer>
									<Text color="gray-400" size="body-sm">
										{cartItem.quantity}x
									</Text>
								</S.QuantityContainer>

								<S.ProductDetails>
									<Text weight="bold" size="body-sm">
										{cartItem.product.name}
									</Text>

									<Text size="body-sm" color="gray-400" style={{ marginTop: 4 }}>
										{formatCurrency(cartItem.product.price)}
									</Text>
								</S.ProductDetails>
							</S.ProductContainer>

							<S.Actions>
								<TouchableOpacity
									onPress={() => onAddToCart(cartItem.product)}
									style={{ marginRight: 24 }}
								>
									<PlusCircle />
								</TouchableOpacity>

								<TouchableOpacity onPress={() => onDecrementCartItem(cartItem.product)}>
									<MinusCircle />
								</TouchableOpacity>
							</S.Actions>
						</S.CartItem>
					)}
				/>
			)}

			<S.Summary>
				<S.TotalContainer>
					{cartItems.length > 0 ? (
						<>
							<Text color="gray-400">Total</Text>

							<Text size="h5" weight="bold">
								{formatCurrency(total)}
							</Text>
						</>
					) : (
						<Text color="gray-400">Seu carrinho está vazio</Text>
					)}
				</S.TotalContainer>

				<Button loading={isLoading} disabled={cartItems.length === 0} onPress={handleConfirmOrder}>
					Confirmar pedido
				</Button>
			</S.Summary>
		</>
	);
}
