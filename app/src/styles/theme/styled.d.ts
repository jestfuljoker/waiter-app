import 'styled-components/native';

import { type theme } from '.';

type ThemeType = typeof theme;

declare module 'styled-components/native' {
	export interface DefaultTheme extends ThemeType {}
}
