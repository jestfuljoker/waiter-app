module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					extensions: [
						'.ios.js',
						'.android.js',
						'.ios.jsx',
						'.android.jsx',
						'.js',
						'.jsx',
						'.json',
						'.ts',
						'.tsx',
					],
					root: ['.'],
					alias: {
						'~/assets': ['./src/assets'],
						'~/components': ['./src/components'],
						'~/mocks': ['./src/mocks'],
						'~/styles': ['./src/styles'],
						'~/utils': ['./src/utils'],
						'~/@types': ['./src/@types'],
						'~/service': ['./src/service'],
					},
				},
			],
		],
	};
};
