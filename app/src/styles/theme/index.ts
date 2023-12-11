import type { DefaultTheme } from 'styled-components/native';

import { colors, font } from './tokens';
import type { Color, FontSize } from './types';

export const theme = { colors, font } as const;

export function getColor(color: Color, theme: DefaultTheme): string {
	const [section, key] = color.split('-') as [
		keyof typeof theme.colors,
		keyof (typeof theme.colors)[keyof typeof theme.colors],
	];

	return theme.colors[section][key];
}

export function getFontSize(fontSize: FontSize, theme: DefaultTheme) {
	return theme.font.sizes[fontSize];
}
