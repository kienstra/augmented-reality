/**
 * General block libraries.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload } = wp.editor;
const {
	Button,
	Placeholder
} = wp.components;

const arViewerBlock = 'augmented-reality/ar-viewer';

/**
 * Registers the AR Viewer block.
 */
export default registerBlockType(
	arViewerBlock,
	{
		title: __( 'AR Viewer', 'augmented-reality' ),
		description: __( 'Place a virtual item in your location', 'augmented-reality'),
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

		edit: props => {
			const { attributes: { objUrl, mtlUrl },
				className, noticeUI, setAttributes } = props;

			const getViewerWrapper = ( url, fileType ) => {
				return (
					<div className="ar-viewer-wrapper">
						{ ! url ? (
							<MediaUpload
								onSelect={ img => {
									let attributes = {};
									attributes[ fileType + 'Url' ] = img.url;
									setAttributes( attributes );
								} }
								type="image"
								value={ url }
								render={ ( { open } ) => (
									<Button
										className={ "button button-large" }
										onClick={ open }
									>
										{ __( 'Select %s file', 'augmented-reality' ).replace( '%s', fileType ) } /* jshint ignore:line */
									</Button>
								) }
							>
							</MediaUpload>
						) : (
							<div>
								<span>{ url.match( '[^\\/]+\\.+' + fileType + '$' ) ? url.match( '[^\\/]+\\.+' + fileType + '$' )[0] : null }</span>
								{ !! url ? (
									<Button
										className="button button-large"
										onClick={ () => {
											let attributes = {};
											attributes[ fileType + 'Url' ] = null;
											setAttributes( attributes );
										} }
									>
										{ __( 'Remove %s file', 'augmented-reality' ).replace( '%s', fileType ) }
									</Button>
								) : null }
							</div>
						) }
					</div>
				)
			};

			return (
				<div className={ className }>
					<Placeholder
						children={ 'this' }
						label={ __( 'Augmented Reality Viewer', 'augmented-reality' ) }
						instructions={ ! objUrl || ! mtlUrl ? __( 'Please select both files', 'augmented-reality' ) : null }
						icon={ 'gallery' }
						className={ 'foo' }
						notices={ noticeUI }
					>
						{ getViewerWrapper( objUrl, 'obj' ) }
						{ getViewerWrapper( mtlUrl, 'mtl' ) }
					</Placeholder>
				</div>
			)
		},

		/**
		 * Renders in PHP.
		 *
		 * @see Block::render_block().
		 */
		save: () => {
			return null;
		},
	},
);
