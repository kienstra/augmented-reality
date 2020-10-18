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

		// eslint-disable-next-line no-console
		errorLog.setScreenshot( base64 );
		const dom = await this.global.page.evaluate(
			() => document.documentElement.outerHTML
		);
		errorLog.setDom( dom );

		await super.teardown();
	}
};
