import { useState } from 'react';
import { FlatList } from 'react-native';

import type { Category } from '~/@types/category';

import { Text } from '../Text';
import * as S from './styles';

interface CategoriesProps {
	categories: Category[];
	onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
	const [selectedCategory, setSelectedCategory] = useState('');

	function handleSelectCategory(categoryId: string) {
		const newCategoryId = selectedCategory === categoryId ? '' : categoryId;

		onSelectCategory(newCategoryId);
		setSelectedCategory(newCategoryId);
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
