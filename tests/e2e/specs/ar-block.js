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
import { clickButton, createNewPost } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { compareToScreenshot, insertBlockFromInserter } from '../helpers';

test( 'ar-viewer block', async () => {
	const blockName = 'AR Viewer';

	// Create a new post and add the AR Viewer block.
	await createNewPost();
	await insertBlockFromInserter( blockName );
	await page.waitForSelector( '.wp-block' );

	// The block should have the Text field.
	const placeholderSelector = '.components-placeholder';
	const placeholder = await page.$eval(
		placeholderSelector,
		( element ) => element.textContent
	);
	const instructions =
		'Upload a model file, or choose one from your media library';
	const label = 'Model';

	await compareToScreenshot( 'augmented-reality/ar-viewer' );
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
	const testImagePath = path.join( __dirname, '..', 'assets', 'Fox.glb' );
	const filename = uuid();
	const tmpFileName = path.join( os.tmpdir(), filename + '.glb' );
	fs.copyFileSync( testImagePath, tmpFileName );

	// Upload a .glb file to the Media Library and insert it into the block.
	await input.uploadFile( tmpFileName );
	const buttonSelector = '.media-button-select:not([disabled])';
	await page.waitForSelector( buttonSelector );
	await page.click( `.down-not-exist ${ buttonSelector }` );

	// The <model-viewer> component should now render, and the placeholder should have 'Edit Model'.
	await page.waitForSelector( 'model-viewer' );
	const placeholderWithEdit = await page.$eval(
		placeholderSelector,
		( element ) => element.textContent
	);
	expect( placeholderWithEdit ).toContain( 'Edit model' );
} );
