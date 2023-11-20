import { ThemeProvider } from 'styled-components';

import { Header } from './components/Header';
import { Orders } from './components/Orders';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

export function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyles />

				<Header />
				<Orders />
			</ThemeProvider>
		</>
	);
}
