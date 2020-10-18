/* eslint-disable no-console */
/**
 * External dependencies
 */
const { VerboseReporter } = require( '@jest/reporters' );

/**
 * Internal dependencies
 */
const errorLog = require( './error-log.js' );
const jsdom = require( 'jsdom' );
const { JSDOM } = jsdom;

module.exports = class ErrorCaptureReporter extends VerboseReporter {
	async onTestResult( ...args ) {
		const testResult = args[ 1 ];
		if ( testResult.numFailingTests !== 0 || testResult.failureMessage ) {
			this.checkForOtherSelector( testResult.failureMessage );
			console.log( errorLog.get() );
		}

		super.onTestResult( ...args );
	}

	checkForOtherSelector( failureMessage ) {
		const dom = new JSDOM( errorLog.getDom() );
		let selectorMatch = failureMessage.match( /for selector: (.*)\n/ );
		if ( ! selectorMatch ) {
			selectorMatch = failureMessage.match(
				/for selector "(.*)" failed/
			);
		}

		if ( ! selectorMatch ) {
			return;
		}

		const fullSelector = selectorMatch[ 1 ];
		const splitSelector = fullSelector.split( /\s/ );
		const selectorsToIgnore = [ 'div', 'span' ];
		const foundSelectors = splitSelector.filter( ( selectorPart ) => {
			return dom.window.document.querySelector( selectorPart );
		} );

		if ( ! foundSelectors.length ) {
			console.log(
				`\n🤔 No part of the selector was found in the DOM: \n${ fullSelector } \n`
			);
			return;
		}

		const foundSelectorsExcludingTags = foundSelectors.filter(
			( foundSelector ) => {
				return ! selectorsToIgnore.includes( foundSelector );
			}
		);

		if ( ! foundSelectorsExcludingTags.length ) {
			return;
		}

		console.log( `\n💡 Maybe the selector changed.` );

		if ( foundSelectors.length > 1 ) {
			console.log(
				`These parts of the failed selector are in the DOM: \n\n${ foundSelectors.join(
					`\n`
				) }`
			);
		} else {
			console.log(
				`This part of the failed selector is in the DOM: \n\n${ foundSelectors.join(
					`\n`
				) }`
			);
		}

		console.log(
			`\n\n...though the full selector isn't: \n\n${ fullSelector } \n`
		);
	}
};
