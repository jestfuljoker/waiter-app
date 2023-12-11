import { useState } from 'react';
import { FlatList } from 'react-native';

import type { Product } from '~/@types/product';
import { PlusCircle } from '~/components/Icons/PlusCircle';
import { formatCurrency } from '~/utils/formatCurrency';

import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import * as S from './styles';

interface MenuProps {
	onAddToCart: (product: Product) => void;
	products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
	const [isProductModalVisible, setIsProductModalVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	function handleOpenModal(product: Product) {
		setIsProductModalVisible(true);
		setSelectedProduct(product);
	}

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
							source={{ uri: `http://192.168.0.23:3001/uploads/${product.imagePath}` }}
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
