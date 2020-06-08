/**
 * External dependencies
 */
import path from 'path';
import fs from 'fs';
import os from 'os';
import uuid from 'uuid/v4';
import { getDocument, queries } from 'pptr-testing-library';

/**
 * WordPress dependencies
 */
import { createNewPost } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import {
	compareToScreenshot,
	insertBlockFromInserter,
} from '../helpers';

const { getByLabelText, getAllByText } = queries;

test( 'ar-viewer block', async () => {
	const blockName = 'AR Viewer';

	// Create a new post and add the AR Viewer block.
	await createNewPost();
	await insertBlockFromInserter( blockName );
	await page.waitForSelector( '.wp-block' );

	const document = await getDocument( page );
	const block = await getByLabelText( document, `Block: ${ blockName }` );
	await compareToScreenshot( 'augmented-reality/ar-viewer' );

	// The block should have the text 'model' in it.
	getAllByText( block, /model/i );

	// Mainly taken from adding-inline-tokens.test.js in Gutenberg.
	const fileInput = await block.$( 'input[type="file"]' );

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
	await fileInput.uploadFile( tmpFileName );

	// The <model-viewer> component should now render, and the placeholder should have 'Edit Model'.
	await page.waitForSelector( 'model-viewer' );
	expect( block ).toMatch( 'Edit model' );

	await getByLabelText( document, /auto-rotate/i );
	await getByLabelText( document, /background color/i );
} );
