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
		errorLog.addToLog(
			`Here is a screenshot of when the test failed: \n \ndata:image/jpeg;base64,${ base64 }`
		);

		const dom = await this.global.page.evaluate(
			() => document.documentElement.outerHTML
		);

		// eslint-disable-next-line no-console
		errorLog.addToLog(
			`And here is the HTML of the entire document: \n \n${ dom }`
		);

		await super.teardown();
	}
};
