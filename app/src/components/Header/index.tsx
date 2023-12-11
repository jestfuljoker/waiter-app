import { TouchableOpacity } from 'react-native';

import { Text } from '../Text';
import * as S from './styles';

interface HeaderProps {
	selectedTable: string;
	onCancelOrder: () => void;
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
	return (
		<S.Container>
			{!selectedTable ? (
				<>
					<Text size="body-sm" opacity={0.9}>
						Bem-vindo(a) ao
					</Text>

					<Text size="h4" weight="medium">
						WAITER
						<Text size="h4">APP</Text>
					</Text>
				</>
			) : (
				<S.OrderContent>
					<S.OrderHeader>
						<Text size="h4" weight="medium">
							Pedido
						</Text>
						<TouchableOpacity onPress={onCancelOrder}>
							<Text color="brand-primary" weight="medium" size="body-sm">
								Cancelar Pedido
							</Text>
						</TouchableOpacity>
					</S.OrderHeader>

					<S.Table>
						<Text color="gray-400">Mesa {selectedTable}</Text>
					</S.Table>
				</S.OrderContent>
			)}
		</S.Container>
	);
}
