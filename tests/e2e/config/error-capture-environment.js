/**
 * External dependencies
 */
const path = require( 'path' );
const PuppeteerEnvironment = require( 'jest-environment-puppeteer' );

class ErrorCaptureEnvironment extends PuppeteerEnvironment {
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
		console.log(
			`Here is a screenshot of when the test failed:
data:image/jpeg;base64,${ base64 }
			`
		);

		await super.teardown();
	}
}

module.exports = ErrorCaptureEnvironment;
