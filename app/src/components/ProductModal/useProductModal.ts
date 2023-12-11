import { type Product } from '~/service/requests/products';

interface UseProductModalProps {
	onAddToCart: (product: Product) => void;
	onClose: () => void;
	product: Product | null;
}

export function useProductModal({ onAddToCart, onClose, product }: UseProductModalProps) {
	function handleAddToCart() {
		onAddToCart(product!);
		onClose();
	}

	return {
		handleAddToCart,
	};
}
