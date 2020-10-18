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
			console.log( errorLog.getConsoleMessage() );
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

	joinArraySubsetFromBeginning( array, length ) {
		const copiedArray = array;
		return copiedArray.splice( 0, length ).join( this.dividingCharacter );
	}

	joinArraySubsetFromEnd( array, length ) {
		const copiedArray = array;
		return copiedArray
			.splice( copiedArray.length - length, length )
			.join( this.dividingCharacter );
	}

	checkForBeginningSelector( attributeName, selectorPart ) {
		let validSelector = '';
		for (
			let subsetLengthToConsider = 1;
			subsetLengthToConsider < selectorPart.length;
			subsetLengthToConsider++
		) {
			const selectorSubsetToConsider = this.joinArraySubsetFromBeginning(
				selectorPart,
				subsetLengthToConsider
			);

			if (
				this.dom.window.document.querySelector(
					`[${ attributeName }*="${ selectorSubsetToConsider }"]`
				)
			) {
				validSelector = selectorSubsetToConsider;
			}
		}

		if ( validSelector ) {
			const elementMatchingSelector = this.dom.window.document.querySelector(
				`[${ attributeName }*="${ validSelector }"]`
			);

			if ( ! elementMatchingSelector ) {
				return;
			}

			elementMatchingSelector.classList.forEach( ( elementClass ) => {
				if ( elementClass.includes( validSelector ) ) {
					console.log(
						`\n💡 Maybe the selector changed. There is a ${ attributeName } of: \n\n${ elementClass } \n\n...similar to the failed ${ attributeName } of: \n\n${ this.fullSelector }`
					);
				}
			} );
		}
	}

	checkForEndingSelector( attributeName, selectorPart ) {
		let endsWithSelector = '';
		for (
			let subsetLengthToConsider = 1;
			subsetLengthToConsider < selectorPart.length;
			subsetLengthToConsider++
		) {
			const selectorSubsetToConsider = this.joinArraySubsetFromEnd(
				selectorPart,
				subsetLengthToConsider
			);

			if (
				this.dom.window.document.querySelector(
					`[${ attributeName }$="${ subsetLengthToConsider }"]`
				)
			) {
				endsWithSelector = selectorSubsetToConsider;
			}
		}

		if ( endsWithSelector ) {
			const elementMatchingSelector = this.dom.window.document.querySelector(
				`[${ attributeName }$="${ endsWithSelector }"]`
			);

			if ( ! elementMatchingSelector ) {
				return;
			}

			elementMatchingSelector.classList.forEach( ( elementClass ) => {
				if ( elementClass.match( `${ endsWithSelector }$` ) ) {
					console.log(
						`\n💡 Maybe the selector changed. There is a ${ attributeName } of: \n\n${ elementClass } \n\n...similar to the failed ${ attributeName } of: \n\n${ this.fullSelector }`
					);
				}
			} );
		}
	}

	/**
	 * If the selector only has one part, like .foo-baz, this checks if there is a similar valid selector.
	 */
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
			const selectorParts = selectorWithoutAttribute.split(
				this.dividingCharacter
			);

			if ( selectorParts.length < 2 ) {
				return;
			}

			const attributeName =
				'#' === this.fullSelector.charAt( 0 ) ? 'id' : 'class';

			this.checkForBeginningSelector( attributeName, selectorParts );
			this.checkForEndingSelector( attributeName, selectorParts );
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

		console.log( `\n💡 Maybe the DOM structure changed.` );

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
