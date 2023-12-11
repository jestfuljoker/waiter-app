import { FlatList } from 'react-native';

import { type Category } from '~/service/requests/categories';

import { Text } from '../Text';
import * as S from './styles';
import { useCategories } from './useCategories';

interface CategoriesProps {
	categories: Category[];
	onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
	const { selectedCategory, handleSelectCategory } = useCategories({ onSelectCategory });

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

						<Text size="body-sm" weight="medium" opacity={isSelected ? 1 : 0.5}>
							{category.name}
						</Text>
					</S.Category>
				);
			}}
		/>
	);
}
