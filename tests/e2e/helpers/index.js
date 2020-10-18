/**
 * WordPress dependencies
 */
import {
	openGlobalBlockInserter,
	pressKeyWithModifier,
} from '@wordpress/e2e-test-utils';

/**
 * Inserts a block from the block inserter, mainly copied from Gutenberg.
 *
 * @see https://github.com/WordPress/gutenberg/blob/56f912adc681ebd3a6fb6a17eb4cfcb2c0050f5b/packages/e2e-test-utils/src/insert-block.js
 *
 * @param {string} blockName The block name to search for.
 */
export const insertBlockFromInserter = async ( blockName ) => {
	await openGlobalBlockInserter();
	await page.focus( '[placeholder="Search for a block"]' );
	await pressKeyWithModifier( 'primary', 'a' );
	await page.keyboard.type( blockName );
	const insertButton = (
		await page.$x( `//button//span[contains(text(), '${ blockName }')]` )
	 )[ 0 ];
	await insertButton.click();
};

/**
 * Compares the editor to a previous screenshot of it.
 *
 * Can be called multiple times, and this will compare to previous screenshots in the same order.
 * Has a threshold of 5% to accomodate differences in non-headless, and minor changes to components.
 */
export const compareToScreenshot = async () => {
	const editor = await page.waitForSelector(
		'.does-not-exist .interface-interface-skeleton__body'
	);
	const blockScreenshot = await editor.screenshot();

	expect( blockScreenshot ).toMatchImageSnapshot( {
		allowSizeMismatch: true,
		failureThresholdType: 'percent',
		failureThreshold: 0.05, // 5% of pixels can differ before this test will fail.
		dumpDiffToConsole: !! process.env.CI, // In a failed test in CI, display a base64 of the diff, as there's no other way to see it.
	} );
};
