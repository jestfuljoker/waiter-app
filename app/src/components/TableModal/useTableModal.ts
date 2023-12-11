import { useState } from 'react';

interface UseTableModalProps {
	onSave: (table: string) => void;
	onClose: () => void;
}

export function useTableModal({ onSave, onClose }: UseTableModalProps) {
	const [table, setTable] = useState('');

	function handleSave() {
		onSave(table);
		setTable('');
		onClose();
	}

	return { table, handleSave, setTable };
}
