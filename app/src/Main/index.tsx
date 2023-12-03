import { useState } from 'react';

import { Button } from '~/components/Button';
import { Categories } from '~/components/Categories';
import { Header } from '~/components/Header';
import { Menu } from '~/components/Menu';
import { TableModal } from '~/components/TableModal';

import * as S from './styles';

export function Main() {
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectedTable] = useState('');

	function handleSaveTable(table: string) {
		setSelectedTable(table);
	}

	return (
		<>
			<TableModal
				visible={isTableModalVisible}
				onClose={() => setIsTableModalVisible(false)}
				onSave={handleSaveTable}
			/>

			<S.Container>
				<Header />

				<S.CategoriesContainer>
					<Categories />
				</S.CategoriesContainer>

				<S.MenuContainer>
					<Menu />
				</S.MenuContainer>
			</S.Container>

			<S.Footer>
				<S.FooterContainer>
					{!selectedTable && (
						<Button onPress={() => setIsTableModalVisible(true)}>Novo Pedido</Button>
					)}
				</S.FooterContainer>
			</S.Footer>
		</>
	);
}
