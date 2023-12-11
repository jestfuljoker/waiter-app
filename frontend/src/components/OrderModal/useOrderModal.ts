import { useEffect } from 'react';

import { useAnimatedUnmount } from '~/hooks';
import { type Order } from '~/service/requests/orders';

interface UseOrderModalProps {
	visible: boolean;
	order: Order | null;
	onClose: () => void;
}

export function useOrderModal({ order, visible, onClose }: UseOrderModalProps) {
	const { elementRef, shouldRender } = useAnimatedUnmount(visible);

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose();
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	const total =
		order?.products.reduce((accumulator, { product, quantity }) => {
			return accumulator + quantity * product.price;
		}, 0) || 0;

	return {
		elementRef,
		shouldRender,
		total,
	};
}
