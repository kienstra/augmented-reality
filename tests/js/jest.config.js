module.exports = {
	rootDir: '../../',
	...require( '@wordpress/scripts/config/jest-unit.config' ),
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': [
			'<rootDir>/node_modules/ts-jest',
		],
	},
	testEnvironment: 'jest-environment-jsdom-sixteen',
	testPathIgnorePatterns: [
		'<rootDir>/.git',
		'<rootDir>/node_modules',
	],
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules',
	],
	coverageReporters: [ 'lcov' ],
	coverageDirectory: '<rootDir>/coverage',
};
