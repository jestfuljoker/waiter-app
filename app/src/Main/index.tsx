import { ActivityIndicator } from 'react-native';

import { Button } from '~/components/Button';
import { Cart } from '~/components/Cart';
import { Categories } from '~/components/Categories';
import { Header } from '~/components/Header';
import { Empty } from '~/components/Icons/Empty';
import { Menu } from '~/components/Menu';
import { TableModal } from '~/components/TableModal';
import { Text } from '~/components/Text';

import * as S from './styles';
import { useMain } from './useMain';

export function Main() {
	const {
		products,
		cartItems,
		isLoading,
		categories,
		selectedTable,
		isLoadingProducts,
		isTableModalVisible,
		handleAddToCart,
		handleSaveTable,
		handleResetOrder,
		handleSelectCategory,
		setIsTableModalVisible,
		handleDecrementCartItem,
	} = useMain();

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
						<ActivityIndicator color="brand-primary" size="large" />
					</S.CenteredContainer>
				)}

				{!isLoading && (
					<>
						<S.CategoriesContainer>
							<Categories categories={categories} onSelectCategory={handleSelectCategory} />
						</S.CategoriesContainer>

						{isLoadingProducts ? (
							<S.CenteredContainer>
								<ActivityIndicator color="brand-primary" size="large" />
							</S.CenteredContainer>
						) : (
							<>
								{products.length > 0 ? (
									<S.MenuContainer>
										<Menu onAddToCart={handleAddToCart} products={products} />
									</S.MenuContainer>
								) : (
									<S.CenteredContainer>
										<Empty />
										<Text color="gray-400" style={{ marginTop: 24 }}>
											Nenhum produto encontrado!
										</Text>
									</S.CenteredContainer>
								)}
							</>
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
						selectedTable={selectedTable}
					/>
				)}
				{/* </S.FooterContainer> */}
			</S.Footer>
		</>
	);
}
