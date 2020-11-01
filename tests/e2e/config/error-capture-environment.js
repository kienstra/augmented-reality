/**
 * External dependencies
 */
const path = require( 'path' );
const PuppeteerEnvironment = require( 'jest-environment-puppeteer' );

/**
 * Internal dependencies
 */
const errorLog = require( './error-log' );

module.exports = class ErrorCaptureEnvironment extends PuppeteerEnvironment {
	async setup() {
		await super.setup();

		const cdpSession = await this.global.page.target().createCDPSession();
		await cdpSession.send( 'Network.enable' );

		cdpSession.on( 'Network.responseReceived', ( message ) => {
			const status =
				message && message.response && message.response.status
					? message.response.status
					: null;
			if ( ! status ) {
				return;
			}

			if ( status >= 300 || status < 200 ) {
				errorLog.addNetworkError( message.response );
			}
		} );

		cdpSession.on( 'Network.loadingFailed', ( message ) => {
			errorLog.addLoadingFailed( message );
		} );
	}

	async teardown() {
		const screenshotPath = path.join(
			__dirname,
			'../failure-screenshot.jpg'
		);
		const screenshotType = 'jpeg';

		const screenshot = await this.global.page.screenshot( {
			path: screenshotPath,
			type: screenshotType,
		} );

		const buffer = Buffer.from( screenshot, screenshotType );
		const base64 = buffer.toString( 'base64' );

		errorLog.setScreenshot( base64 );
		const dom = await this.global.page.evaluate(
			() => document.documentElement.outerHTML
		);
		errorLog.setDom( dom );

		await super.teardown();
	}
};
