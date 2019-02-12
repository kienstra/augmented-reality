/**
 * General block libraries.
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	Editable,
	MediaUpload
} = wp.editor;
const {
	Button,
	Placeholder
} = wp.components;

/**
 * Register AR Viewer block.
 */
export default registerBlockType(
	'augmented-reality/ar-viewer',
	{
		title: __( 'AR Viewer', 'augmented-reality' ),
		description: __( 'Place a virtual item in your location', 'augmented-reality'),
		category: 'common',
		icon: 'embed-generic',
		keywords: [
			__( 'MediaUpload', 'augmented-reality' ),
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

						<div className="ar-viewer-wrapper">
							{ ! objUrl ? (
								<MediaUpload
									onSelect={ img => {
										setAttributes( {
											objUrl: img.url,
										} );
									} }
									type="image"
									value={ objUrl }
									render={ ( { open } ) => (
										<Button
											className={ "button button-large" }
											onClick={ open }
										>
											{ __( 'Select .obj file', 'augmented-reality' ) }
										</Button>
									) }
								>
								</MediaUpload>
							) : (
								<div>
									<span>{ objUrl.match( /[^\/]+\.obj+$/ ) ? objUrl.match( /[^\/]+\.obj+$/ )[0] : null }</span>
									{ !! objUrl ? (
										<Button
											className="button button-large"
											onClick={ () => {
												setAttributes({
													objUrl: null,
												} );
											} }
										>
											{ __( 'Remove .obj file', 'augmented-reality' ) }
										</Button>
									) : null }
								</div>
							) }
						</div>

						<div className="ar-viewer-wrapper">
							{ ! mtlUrl ? (
								<MediaUpload
									onSelect={ img => {
										setAttributes( {
											mtlUrl: img.url,
										} );
									} }
									type="image"
									value={ mtlUrl }
									render={ ( { open } ) => (
										<Button
											className="button button-large"
											onClick={ open }
										>
											{ __( 'Select .mtl file', 'augmented-reality' ) }
										</Button>
									) }
								>
								</MediaUpload>
							) : (
								<div>
									<span>{ mtlUrl.match( /[^\/]+\.mtl+$/ ) ? mtlUrl.match( /[^\/]+\.mtl+$/ )[0] : null }</span>
									{ !! mtlUrl ? (
										<Button
											className="button button-large"
											onClick={ () => {
												setAttributes({
													mtlUrl: null,
												} );
											} }
										>
											{ __( 'Remove .mtl file', 'augmented-reality' ) }
										</Button>
									) : null }
								</div>
							)
						}
						</div>
					</Placeholder>
				</div>
			)
		},

		save: props => {
			// Renders in PHP.
			return null;
		},
	},
);
