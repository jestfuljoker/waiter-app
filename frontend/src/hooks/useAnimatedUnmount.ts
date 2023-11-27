import { useState, useRef, useEffect } from 'react';

export function useAnimatedUnmount(visible: boolean) {
	const [shouldRender, setShouldRender] = useState(visible);
	const elementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const elementRefCurrent = elementRef.current;

		function handleAnimationEnd() {
			setShouldRender(false);
		}

		if (visible) {
			setShouldRender(true);
		}

		if (!visible) {
			elementRefCurrent?.addEventListener('animationend', handleAnimationEnd);
		}

		return () => elementRefCurrent?.removeEventListener('animationend', handleAnimationEnd);
	}, [visible]);

	return {
		elementRef,
		shouldRender,
	};
}
