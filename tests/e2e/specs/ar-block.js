/**
 * External dependencies
 */
import path from 'path';
import fs from 'fs';
import os from 'os';
import uuid from 'uuid/v4';

/**
 * WordPress dependencies
 */
import {
	clickButton,
	createNewPost,
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
const insertBlockFromInserter = async ( blockName ) => {
	await openGlobalBlockInserter();
	await page.focus( '[placeholder="Search for a block"]' );
	await pressKeyWithModifier( 'primary', 'a' );
	await page.keyboard.type( blockName );
	const insertButton = (
		await page.$x( `//button//span[contains(text(), '${ blockName }')]` )
	)[ 0 ];
	await insertButton.click();
};

test( 'ar-viewer block', async () => {
	const blockName = 'AR Viewer';

	// Create a new post and add the AR Viewer block.
	await createNewPost();
	await insertBlockFromInserter( blockName );
	await page.waitForSelector( '.wp-block' );

	// The block should have the Text field.
	const placeholderSelector = '.components-placeholder';
	const placeholder = await page.$eval( placeholderSelector, ( element ) => element.textContent );
	const instructions = 'Upload a model file, or choose one from your media library';
	const label = 'Model';

	expect( placeholder ).toContain( instructions );
	expect( placeholder ).toContain( label );

	// Mainly taken from adding-inline-tokens.test.js in Gutenberg.
	// Open the Media Library to upload a .glb file.
	await clickButton( 'Media Library' );
	const inputSelector = '.media-modal input[type=file]';
	await page.waitForSelector( inputSelector );
	const input = await page.$( inputSelector );

	// Fox.glb by PixelMannen is licensed under CC0.
	// https://github.com/KhronosGroup/glTF-Sample-Models/tree/5aec133dbaf543f9bcb6cb79de9966bf9530c2fe/2.0/Fox
	// https://creativecommons.org/publicdomain/zero/1.0/
	const testImagePath = path.join(
		__dirname,
		'..',
		'assets',
		'Fox.glb'
	);
	const filename = uuid();
	const tmpFileName = path.join( os.tmpdir(), filename + '.glb' );
	fs.copyFileSync( testImagePath, tmpFileName );

	// Upload a .glb file to the Media Library and insert it into the block.
	await input.uploadFile( tmpFileName );
	const buttonSelector = '.media-button-select:not([disabled])';
	await page.waitForSelector( buttonSelector );
	await page.click( buttonSelector );

	// The <model-viewer> component should now render, and the placeholder should have 'Edit Model'.
	await page.waitForSelector( 'model-viewer' );
	const placeholderWithEdit = await page.$eval( placeholderSelector, ( element ) => element.textContent );
	await expect( placeholderWithEdit ).toContain( 'Edit model' );
} );
