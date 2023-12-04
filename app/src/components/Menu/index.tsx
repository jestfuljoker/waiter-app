import { useState } from 'react';
import { FlatList } from 'react-native';

import type { Product } from '~/@types/product';
import { PlusCircle } from '~/components/Icons/PlusCircle';
import { products } from '~/mocks/products';
import { formatCurrency } from '~/utils/formatCurrency';

import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import * as S from './styles';

export function Menu() {
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
							<Text weight="600">{product.name}</Text>

							<Text style={{ marginVertical: 8 }} color="#666" size={14}>
								{product.description}
							</Text>

							<Text size={14} weight="600">
								{formatCurrency(product.price)}
							</Text>
						</S.ProductDetails>

						<S.AddToCartButton>
							<PlusCircle />
						</S.AddToCartButton>
					</S.Product>
				)}
			/>
		</>
	);
}
