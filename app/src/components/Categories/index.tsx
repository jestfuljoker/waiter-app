import { FlatList } from 'react-native';

import { categories } from '~/mocks/categories';

import { Text } from '../Text';
import * as S from './styles';

export function Categories() {
	return (
		<FlatList
			horizontal
			data={categories}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingRight: 24 }}
			keyExtractor={(category) => category._id}
			renderItem={({ item: category }) => (
				<S.Category>
					<S.Icon>
						<Text>{category.icon}</Text>
					</S.Icon>

					<Text size={14} weight="600">
						{category.name}
					</Text>
				</S.Category>
			)}
		/>
	);
}
