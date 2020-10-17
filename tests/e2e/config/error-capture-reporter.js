/**
 * External dependencies
 */
const { VerboseReporter } = require( '@jest/reporters' );

/**
 * Internal dependencies
 */
const errorLog = require( './error-log.js' );

module.exports = class ErrorCaptureReporter extends VerboseReporter {
	async onTestResult( ...args ) {
		const testResult = args[ 1 ];
		if ( testResult.numFailingTests !== 0 || testResult.failureMessage ) {
			// eslint-disable-next-line no-console
			console.log( errorLog.get() );
			super.onTestResult( ...args );
		}
	}
};
