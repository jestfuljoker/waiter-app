module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'eslint-plugin-import-helpers', 'prettier'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'prettier/prettier': 'error',
		'import-helpers/order-imports': [
			'warn',
			{
				newlinesBetween: 'always',
				groups: ['module', '/^@shared/', ['parent', 'sibling', 'index']],
				alphabetize: { order: 'asc', ignoreCase: true },
			},
		],
	},
};
