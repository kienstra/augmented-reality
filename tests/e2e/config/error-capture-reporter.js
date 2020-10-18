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
			this.setProperties( testResult.failureMessage );
			this.checkForSingleSelector();
			this.checkForOtherSelectors();
			// console.log( errorLog.get() );
		}

		super.onTestResult( ...args );
	}

	setProperties( failureMessage ) {
		this.dom = new JSDOM( errorLog.getDom() );
		this.dividingCharacter = '-';
		let selectorMatch = failureMessage.match( /for selector: (.*)\n/ );
		if ( ! selectorMatch ) {
			selectorMatch = failureMessage.match(
				/for selector "(.*)" failed/
			);
		}

		this.fullSelector = selectorMatch ? selectorMatch[ 1 ] : null;
	}

	checkForBeginningSelector( attributeName, selectorPart ) {
		let startsWithSelector = selectorPart[ 0 ];
		for ( let i = 1; i < selectorPart.length; i++ ) {
			if (
				this.dom.window.document.querySelector(
					`[${ attributeName }*="${ startsWithSelector +
						this.dividingCharacter +
						selectorPart[ i ] }"]`
				)
			) {
				startsWithSelector =
					startsWithSelector +
					this.dividingCharacter +
					selectorPart[ i ];
			}
		}

		if ( startsWithSelector ) {
			const elementMatchingSelector = this.dom.window.document.querySelector(
				`[${ attributeName }*="${ startsWithSelector }"]`
			);

			elementMatchingSelector.classList.forEach( ( elementClass ) => {
				if ( elementClass.includes( startsWithSelector ) ) {
					console.log(
						`\n💡 Maybe the selector changed. There is a ${ attributeName } of: \n\n${ elementClass } \n\n...similar to the failed ${ attributeName } of: \n\n${ this.fullSelector }`
					);
				}
			} );
		}
	}

	checkForEndingSelector( attributeName, selectorPart ) {
		if ( selectorPart.length < 2 ) {
			return;
		}

		let endsWithSelector = selectorPart[ selectorPart.length - 1 ];
		for ( let i = selectorPart.length - 2; i >= 0; i-- ) {
			if (
				this.dom.window.document.querySelector(
					`[${ attributeName }$="${ selectorPart[ i ] +
						this.dividingCharacter +
						endsWithSelector }"]`
				)
			) {
				endsWithSelector =
					selectorPart[ i ] +
					this.dividingCharacter +
					endsWithSelector;
			}
		}

		if ( endsWithSelector ) {
			const elementMatchingSelector = this.dom.window.document.querySelector(
				`[${ attributeName }$="${ endsWithSelector }"]`
			);
			elementMatchingSelector.classList.forEach( ( elementClass ) => {
				if ( elementClass.match( `${ endsWithSelector }$` ) ) {
					console.log(
						`\n💡 Maybe the selector changed. There is a ${ attributeName } of: \n\n${ elementClass } \n\n...similar to the failed ${ attributeName } of: \n\n${ this.fullSelector }`
					);
				}
			} );
		}
	}

	checkForSingleSelector() {
		if ( ! this.fullSelector ) {
			return;
		}

		const matchedSelectorWithoutAttribute = this.fullSelector.match(
			/^(#|\.)(.*)/
		);
		const selectorWithoutAttribute = matchedSelectorWithoutAttribute[ 2 ];
		const splitSelector = selectorWithoutAttribute.split( /\s/ );

		if ( 1 === splitSelector.length && selectorWithoutAttribute ) {
			const selectorPart = selectorWithoutAttribute.split(
				this.dividingCharacter
			);

			if ( selectorPart.length <= 1 ) {
				return;
			}

			const attributeName =
				'#' === this.fullSelector.charAt( 0 ) ? 'id' : 'class';

			this.checkForBeginningSelector( attributeName, selectorPart );
			this.checkForEndingSelector( attributeName, selectorPart );
		}
	}

	checkForOtherSelectors() {
		if ( ! this.fullSelector ) {
			return;
		}

		const selectorsToIgnore = [ 'div', 'span' ];
		const splitSelector = this.fullSelector.split( /\s/ );
		const foundSelectors = splitSelector.filter( ( selectorPart ) => {
			return this.dom.window.document.querySelector( selectorPart );
		} );

		if ( ! foundSelectors.length ) {
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
			`\n\n...though the full selector isn't: \n\n${ this.fullSelector } \n`
		);
	}
};
