const config = require('./tsconfig.json');

const { baseUrl, paths } = config.compilerOptions;

const getAliases = () => {
	return Object.entries(paths).reduce((aliases, alias) => {
		const key = alias[0].replace('/*', '');
		const value = baseUrl + alias[1][0].replace('*', '');
		return {
			...aliases,
			[key]: value,
		};
	}, {});
};

module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					extensions: ['.ts', '.tsx', '.android.tsx', '.ios.tsx'],
					alias: getAliases(),
				},
			],
		],
	};
};
