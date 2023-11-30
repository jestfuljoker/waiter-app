import { useState } from 'react';
import { FlatList } from 'react-native';

import { categories } from '~/mocks/categories';

import { Text } from '../Text';
import * as S from './styles';

export function Categories() {
	const [selectedCategory, setSelectedCategory] = useState('');

	function handleSelectCategory(categoryId: string) {
		setSelectedCategory((prev) => (prev === categoryId ? '' : categoryId));
	}

	return (
		<FlatList
			horizontal
			data={categories}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingRight: 24 }}
			keyExtractor={(category) => category.id}
			renderItem={({ item: category }) => {
				const isSelected = category.id === selectedCategory;

				return (
					<S.Category onPress={() => handleSelectCategory(category.id)}>
						<S.Icon>
							<Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
						</S.Icon>

						<Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
							{category.name}
						</Text>
					</S.Category>
				);
			}}
		/>
	);
}
