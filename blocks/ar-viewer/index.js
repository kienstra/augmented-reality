/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	Editable,
	MediaUpload,
} = wp.editor;
const {
	Button,
} = wp.components;

/**
 * Register AR Viewer block.
 */
export default registerBlockType(
	'augment-reality-blocks/ar-viewer',
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
				source: 'attribute',
				attribute: 'data-ar-url',
				selector: '#enter-ar-info',
			},
			objId: {
				type: 'number',
			}
		},
		edit: props => {
			const { attributes: { objId, objUrl, mtlId, mtlUrl },
				className, setAttributes, isSelected } = props;

			return (
				<div className={ className }>

					{ ! objId ? (

						<MediaUpload
							onSelect={ img => {
								setAttributes( {
									objId: img.id,
									objUrl: img.url,
								} );
							} }
							type="image"
							value={ objId }
							render={ ( { open } ) => (
								<Button
									className={ "button button-large" }
									onClick={ open }
								>
									{ __( 'Upload Image', 'augmented-reality' ) }
								</Button>
							) }
						>
						</MediaUpload>

					) : (

						<p class="image-wrapper">
							{ __( 'Augmented Reality .obj file', 'augmented-reality' ) }
							<img
								src={ objUrl }
							/>

							{ isSelected ? (

								<Button
									className="remove-image"
									onClick={ () => {
										setAttributes({
											objId: null,
											objUrl: null,
										} );
									} }
								>
								</Button>

							) : null }

						</p>
					) }

					{ ! mtlId ? (

						<MediaUpload
							onSelect={ img => {
								setAttributes( {
									mtlId: img.id,
									mtlUrl: img.url,
								} );
							} }
							type="image"
							value={ mtlId }
							render={ ( { open } ) => (
								<Button
									className={ "button button-large" }
									onClick={ open }
								>
									{ __( 'Upload Image', 'augmented-reality' ) }
								</Button>
							) }
						>
						</MediaUpload>

					) : (

						<p class="image-wrapper">
							{ __( '.mtl file', 'augmented-reality' ) }
							<img
								src={ mtlUrl }
							/>

							{ isSelected ? (

								<Button
									className="remove-image"
									onClick={ () => {
										setAttributes({
											mtlId: null,
											mtlUrl: null,
										} );
									} }
								>
								</Button>

							) : null }

						</p>
					) }
				</div>
			);
		},
		save: props => {
			const { objUrl, mtlUrl } = props.attributes;
			return (
				<div>
					<div id="enter-ar-info" class="demo-card mdl-card mdl-shadow--4dp" data-obj-url={ objUrl } data-mtl-url={ mtlUrl }>
						<div class="mdl-card__title">
							<h2 class="mdl-card__title-text">{ __( 'Augmented Reality Experience', 'augmented-reality' ) }</h2>
						</div>
						<div class="mdl-card__actions mdl-card--border">
							<a id="enter-ar" class="mdl-button mdl-button--raised mdl-button--accent">
								{ __( 'Start augmented reality', 'augmented-reality' ) }
							</a>
						</div>
					</div>
					<div id="unsupported-info" style="display:none" class="demo-card mdl-card mdl-shadow--4dp">
					  <div class="mdl-card__title">
						<h2 class="mdl-card__title-text">{ __( 'Unsupported Browser', 'augmented-reality' ) }</h2>
						</div>
						<div class="mdl-card__supporting-text">
							{ __( 'Your browser does not support AR features with WebXR.', 'augmented-reality' ) }
						</div>
					</div>
					<div id="stabilization"></div>
					<div id="ar-canvas"></div>
				</div>
			);
		},
	},
);
