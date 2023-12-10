export const theme = {
	colors: {
		brand: {
			primary: '#D73035',
			light: '#FFABAD',
			dark: '#8A1114',
		},
		gray: {
			'500': '#333333',
			'400': '#666666',
			'300': '#999999',
			'200': '#CCCCCC',
			'100': '#F2F2F2',
			'100-40%': '#CCCCCC66',
			'0': '#FFFFFF',
		},
		support: {
			yellow: '#FFF7AB',
			bg: '#FAFAFA',
			orange: '#D76C30',
			green: '#30D787',
		},
	},
	font: {
		sizes: {
			xxsm: '14px',
			xsm: '16px',
			sm: '20px',
			md: '24px',
			lg: '32px',
			xl: '40px',
			xxl: '48px',
			biggest: '56px',
		},
		weight: {
			regular: 400,
			medium: 500,
			bold: 600,
		},
	},
} as const;
