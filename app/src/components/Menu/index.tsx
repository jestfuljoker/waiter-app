import { FlatList } from 'react-native';

import { PlusCircle } from '~/components/Icons/PlusCircle';
import { type Product } from '~/service/requests/products';
import { formatCurrency } from '~/utils/formatCurrency';

import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import * as S from './styles';
import { useMenu } from './useMenu';

interface MenuProps {
	onAddToCart: (product: Product) => void;
	products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
	const { selectedProduct, isProductModalVisible, handleOpenModal, setIsProductModalVisible } =
		useMenu();

	return (
		<>
			<ProductModal
				visible={isProductModalVisible}
				onClose={() => setIsProductModalVisible(false)}
				product={selectedProduct}
				onAddToCart={onAddToCart}
			/>

			<FlatList
				style={{ marginTop: 32 }}
				contentContainerStyle={{ paddingHorizontal: 24 }}
				data={products}
				keyExtractor={(product) => product.id}
				ItemSeparatorComponent={S.Separator}
				renderItem={({ item: product }) => (
					<S.Product onPress={() => handleOpenModal(product)}>
						<S.ProductImage
							source={{ uri: `http://192.168.0.20:3001/uploads/${product.imagePath}` }}
						/>

						<S.ProductDetails>
							<Text weight="medium">{product.name}</Text>

							<Text style={{ marginVertical: 8 }} color="gray-400" size="body-sm">
								{product.description}
							</Text>

							<Text size="body-sm" weight="medium">
								{formatCurrency(product.price)}
							</Text>
						</S.ProductDetails>

						<S.AddToCartButton onPress={() => onAddToCart(product)}>
							<PlusCircle />
						</S.AddToCartButton>
					</S.Product>
				)}
			/>
		</>
	);
}
