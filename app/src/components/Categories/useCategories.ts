import { useState } from 'react';

interface UseCategoriesProps {
	onSelectCategory: (categoryId: string) => void;
}

export function useCategories({ onSelectCategory }: UseCategoriesProps) {
	const [selectedCategory, setSelectedCategory] = useState('');

	function handleSelectCategory(categoryId: string) {
		const newCategoryId = selectedCategory === categoryId ? '' : categoryId;

		onSelectCategory(newCategoryId);
		setSelectedCategory(newCategoryId);
	}

	return {
		selectedCategory,
		handleSelectCategory,
	};
}
