/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import Edit from './edit';

const arViewerBlock = 'augmented-reality/ar-viewer';

/**
 * Registers the AR Viewer block.
 */
export default registerBlockType(
	arViewerBlock,
	{
		title: __( 'AR Viewer', 'augmented-reality' ),
		description: __( 'Place a virtual item in your location', 'augmented-reality' ),
		category: 'common',
		icon: 'embed-generic',
		keywords: [
			__( 'Augmented Reality', 'augmented-reality' ),
		],
		attributes: {
			objUrl: {
				type: 'string',
			},
			mtlUrl: {
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
		save: () => {
			return null;
		},
	}
);
