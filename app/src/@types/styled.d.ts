import 'styled-components';
import { type theme } from '~/styles/theme';

type ThemeColors = typeof theme.colors;

declare module 'styled-components' {
	export interface DefaultTheme extends ThemeType {}
}
