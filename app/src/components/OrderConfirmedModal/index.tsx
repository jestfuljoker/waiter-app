import { Modal } from 'react-native';

import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import * as S from './styles';

interface OrderConfirmedModal {
	visible: boolean;
	onOk: () => void;
}

export function OrderConfirmedModal({ visible, onOk }: OrderConfirmedModal) {
	return (
		<Modal visible={visible} animationType="slide">
			<S.Container>
				<CheckCircle />

				<Text size="h5" weight="medium" color="gray-0" style={{ marginTop: 12 }}>
					Pedido confirmado
				</Text>

				<Text color="gray-0" opacity={0.9} style={{ marginTop: 4 }}>
					O pedido já entrou na fila de produção!
				</Text>

				<S.OkButton onPress={onOk}>
					<Text color="brand-primary" weight="medium">
						OK
					</Text>
				</S.OkButton>
			</S.Container>
		</Modal>
	);
}
