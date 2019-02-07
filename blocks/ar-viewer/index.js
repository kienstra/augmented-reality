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
			itemURL: {
				type: 'string',
				source: 'attribute',
				attribute: 'data-ar-url',
				selector: '#enter-ar-info',
			},
			imgID: {
				type: 'number',
			}
		},
		edit: props => {
			const { attributes: { imgID, itemURL },
				className, setAttributes, isSelected } = props;
			const onSelectImage = img => {
				setAttributes( {
					imgID: img.id,
					itemURL: img.url,
				} );
			};
			const onRemoveImage = () => {
				setAttributes({
					imgID: null,
					itemURL: null,
				});
			}
			return (
				<div className={ className }>

					{ ! imgID ? (

						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ imgID }
							render={ ( { open } ) => (
								<Button
									className={ "button button-large" }
									onClick={ open }
								>
									{ __( ' Upload Image', 'jsforwpblocks' ) }
								</Button>
							) }
						>
						</MediaUpload>

					) : (

						<p class="image-wrapper">
							{ __( 'Augmented Reality .obj file', 'augmented-reality' ) }
							<img
								src={ itemURL }
							/>

							{ isSelected ? (

								<Button
									className="remove-image"
									onClick={ onRemoveImage }
								>
								</Button>

							) : null }

						</p>
					)}

				</div>
			);
		},
		save: props => {
			const { itemURL } = props.attributes;
			return (
				<div>
					<div id="enter-ar-info" class="demo-card mdl-card mdl-shadow--4dp" data-ar-url={ itemURL }>
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
