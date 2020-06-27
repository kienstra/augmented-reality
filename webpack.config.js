/**
 * External dependencies
 */
const path = require( 'path' );

/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		block: './js/src/block/index.ts',
		'model-viewer': './js/src/model-viewer.js',
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				use: [ 'ts-loader' ],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [ '.js', '.ts', '.tsx' ],
	},
	output: {
		path: path.resolve( __dirname, 'js/dist' ),
		filename: '[name].js',
	},
};
