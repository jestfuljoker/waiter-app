import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import type { CartItem } from '~/@types/cartItem';
import type { Product } from '~/@types/product';
import { Button } from '~/components/Button';
import { Cart } from '~/components/Cart';
import { Categories } from '~/components/Categories';
import { Header } from '~/components/Header';
import { Empty } from '~/components/Icons/Empty';
import { Menu } from '~/components/Menu';
import { TableModal } from '~/components/TableModal';
import { Text } from '~/components/Text';
import { products as mockProducts } from '~/mocks/products';

import * as S from './styles';

export function Main() {
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectedTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);

	function handleSaveTable(table: string) {
		setSelectedTable(table);
	}

	function handleResetOrder() {
		setSelectedTable('');
		setCartItems([]);
	}

	function handleAddToCart(product: Product) {
		if (!selectedTable) {
			setIsTableModalVisible(true);
		}

		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex((cartItem) => cartItem.product.id === product.id);

			if (itemIndex < 0) {
				return [...prevState, { product, quantity: 1 }];
			}

			const newCartItems = [...prevState];

			const item = newCartItems[itemIndex];

			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity + 1,
			};

			return newCartItems;
		});
	}

	function handleDecrementCartItem(product: Product) {
		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex((cartItem) => cartItem.product.id === product.id);

			const item = prevState[itemIndex];
			const newCartItems = [...prevState];

			if (item.quantity === 1) {
				newCartItems.splice(itemIndex, 1);
				return newCartItems;
			}

			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity - 1,
			};

			return newCartItems;
		});
	}

	return (
		<>
			<TableModal
				visible={isTableModalVisible}
				onClose={() => setIsTableModalVisible(false)}
				onSave={handleSaveTable}
			/>

			<S.Container>
				<Header selectedTable={selectedTable} onCancelOrder={handleResetOrder} />

				{isLoading && (
					<S.CenteredContainer>
						<ActivityIndicator color="#D73035" size="large" />
					</S.CenteredContainer>
				)}

				{!isLoading && (
					<>
						<S.CategoriesContainer>
							<Categories />
						</S.CategoriesContainer>

						{products.length > 0 ? (
							<S.MenuContainer>
								<Menu onAddToCart={handleAddToCart} products={products} />
							</S.MenuContainer>
						) : (
							<S.CenteredContainer>
								<Empty />
								<Text color="#666" style={{ marginTop: 24 }}>
									Nenhum produto encontrado!
								</Text>
							</S.CenteredContainer>
						)}
					</>
				)}
			</S.Container>

			<S.Footer>
				{/* <S.FooterContainer> */}
				{!selectedTable ? (
					<Button onPress={() => setIsTableModalVisible(true)} disabled={isLoading}>
						Novo Pedido
					</Button>
				) : (
					<Cart
						cartItems={cartItems}
						onAddToCart={handleAddToCart}
						onDecrementCartItem={handleDecrementCartItem}
						onConfirmOrder={handleResetOrder}
					/>
				)}
				{/* </S.FooterContainer> */}
			</S.Footer>
		</>
	);
}
