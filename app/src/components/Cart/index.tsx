import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import type { CartItem } from '~/@types/cartItem';
import type { Product } from '~/@types/product';
import { api } from '~/service/api';
import { formatCurrency } from '~/utils/formatCurrency';

import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { Text } from '../Text';
import * as S from './styles';

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
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const total = cartItems.reduce((accumulator, cartItem) => {
		return accumulator + cartItem.quantity * cartItem.product.price;
	}, 0);

	async function handleConfirmOrder() {
		const payload = {
			table: selectedTable,
			products: cartItems.map((cartItem) => ({
				product: cartItem.product.id,
				quantity: cartItem.quantity,
			})),
		};

		setIsLoading(true);

		await api.post('/orders', payload);

		setIsLoading(false);
		setIsModalVisible(true);
	}

	function handleOk() {
		setIsModalVisible(false);
		onConfirmOrder();
	}

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
									source={{ uri: `http://192.168.0.23:3001/uploads/${cartItem.product.imagePath}` }}
								/>

								<S.QuantityContainer>
									<Text color="#666" size={14}>
										{cartItem.quantity}x
									</Text>
								</S.QuantityContainer>

								<S.ProductDetails>
									<Text weight="600" size={14}>
										{cartItem.product.name}
									</Text>

									<Text size={14} color="#666" style={{ marginTop: 4 }}>
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
							<Text color="#666">Total</Text>

							<Text size={20} weight="600">
								{formatCurrency(total)}
							</Text>
						</>
					) : (
						<Text color="#666">Seu carrinho está vazio</Text>
					)}
				</S.TotalContainer>

				<Button loading={isLoading} disabled={cartItems.length === 0} onPress={handleConfirmOrder}>
					Confirmar pedido
				</Button>
			</S.Summary>
		</>
	);
}
