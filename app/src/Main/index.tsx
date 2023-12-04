import { useState } from 'react';

import type { CartItem } from '~/@types/cartItem';
import { Button } from '~/components/Button';
import { Cart } from '~/components/Cart';
import { Categories } from '~/components/Categories';
import { Header } from '~/components/Header';
import { Menu } from '~/components/Menu';
import { TableModal } from '~/components/TableModal';

import * as S from './styles';

export function Main() {
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectedTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([
		{
			product: {
				id: '6372e040f52e37ef85fe2c5e',
				name: 'Pizza quatro queijos',
				description: 'Deliciosa pizza quatro queijos com borda simples',
				imagePath: '1700394188060-quatro-queijos.png',
				price: 40,
				ingredients: [
					{
						name: 'Mussarela',
						icon: '🧀',
						id: '6372e040f52e37ef85fe2c5f',
					},
					{
						name: 'Parmesão',
						icon: '🧀',
						id: '6372e040f52e37ef85fe2c60',
					},
					{
						name: 'Gouda',
						icon: '🧀',
						id: '6372e040f52e37ef85fe2c61',
					},
					{
						name: 'Brie',
						icon: '🧀',
						id: '6372e040f52e37ef85fe2c62',
					},
				],
			},
			quantity: 2,
		},
		{
			product: {
				id: '6372e276a381106c0f854cb3',
				name: 'Coca cola',
				description: 'Coca cola lata geladinha topzera',
				imagePath: '1700394589247-coca-cola.png',
				price: 7,
				ingredients: [],
			},
			quantity: 2,
		},
	]);

	function handleSaveTable(table: string) {
		setSelectedTable(table);
	}

	function handleCancelOrder() {
		setSelectedTable('');
	}

	function handleAddToCart(item: CartItem) {
		setCartItems((prevState) => [...prevState, item]);
	}

	return (
		<>
			<TableModal
				visible={isTableModalVisible}
				onClose={() => setIsTableModalVisible(false)}
				onSave={handleSaveTable}
			/>

			<S.Container>
				<Header selectedTable={selectedTable} onCancelOrder={handleCancelOrder} />

				<S.CategoriesContainer>
					<Categories />
				</S.CategoriesContainer>

				<S.MenuContainer>
					<Menu />
				</S.MenuContainer>
			</S.Container>

			<S.Footer>
				<S.FooterContainer>
					{!selectedTable ? (
						<Button onPress={() => setIsTableModalVisible(true)}>Novo Pedido</Button>
					) : (
						<Cart cartItems={cartItems} />
					)}
				</S.FooterContainer>
			</S.Footer>
		</>
	);
}
