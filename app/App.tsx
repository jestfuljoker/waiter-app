import { useFonts } from 'expo-font';

import { Main } from './src/Main';

export default function App() {
	const [isFontLoaded] = useFonts({
		'GeneralSans-400': require('~/assets/fonts/GeneralSans-Regular.otf'),
		'GeneralSans-600': require('~/assets/fonts/GeneralSans-Semibold.otf'),
		'GeneralSans-700': require('~/assets/fonts/GeneralSans-Bold.otf'),
	});

	return isFontLoaded ? <Main /> : null;
}
