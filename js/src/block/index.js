/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';

/**
 * Registers the AR Viewer block.
 */
export default registerBlockType( 'augmented-reality/ar-viewer', {
	title: __( 'AR Viewer', 'augmented-reality' ),
	description: __(
		'Place a virtual item in your location',
		'augmented-reality'
	),
	category: 'common',
	icon: 'embed-generic',
	keywords: [ __( 'Augmented Reality', 'augmented-reality' ) ],
	attributes: {
		id: {
			type: 'number',
		},
		url: {
			type: 'string',
		},
		autoRotate: {
			type: 'boolean',
		},
		backgroundColor: {
			type: 'string',
		},
	},

	/**
	 * The block editor UI.
	 */
	edit: Edit,

	/**
	 * Renders in PHP.
	 *
	 * @see Block::render_block().
	 * @return {null} Rendered in PHP.
	 */
	save() {
		return null;
	},
} );
