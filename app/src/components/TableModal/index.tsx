import { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';

import { isAndroid } from '~/utils/os';

import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import * as S from './styles';

interface TableModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
	const [table, setTable] = useState('');

	function handleSave() {
		onSave(table);
		setTable('');
		onClose();
	}

	return (
		<Modal transparent visible={visible} animationType="fade">
			<S.Overlay behavior={isAndroid ? 'height' : 'padding'}>
				<S.Body>
					<S.Header>
						<Text weight="600">Informe a mesa</Text>

						<TouchableOpacity onPress={onClose}>
							<Close color="#666" />
						</TouchableOpacity>
					</S.Header>

					<S.Form>
						<S.Input
							autoFocus
							onChangeText={(value) => setTable(value)}
							keyboardType="number-pad"
							placeholder="Número da mesa"
							placeholderTextColor="#666"
							value={table}
						/>

						<Button disabled={table.length === 0} onPress={handleSave}>
							Salvar
						</Button>
					</S.Form>
				</S.Body>
			</S.Overlay>
		</Modal>
	);
}
