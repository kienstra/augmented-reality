module.exports = {
	...require( '@wordpress/scripts/config/jest-e2e.config' ),
	setupFilesAfterEnv: [
		'<rootDir>/config/setup-test-framework.js',
		'@wordpress/jest-console',
		'@wordpress/jest-puppeteer-axe',
		'expect-puppeteer',
	],
	testEnvironment: '<rootDir>/config/error-capture-environment.js',
	reporters: [ '<rootDir>/config/error-capture-reporter.js' ],
	testPathIgnorePatterns: [ '/node_modules/' ],
};
