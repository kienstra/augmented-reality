/**
 * Internal block libraries
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
				attribute: 'data-obj-url',
				selector: '#enter-ar-info',
			},
			objId: {
				type: 'number',
			},
			mtlUrl: {
				type: 'string',
				source: 'attribute',
				attribute: 'data-mtl-url',
				selector: '#enter-ar-info',
			},
			mtlId: {
				type: 'number',
			}
		},

		edit: props => {
			const { attributes: { objId, objUrl, mtlId, mtlUrl },
				className, isSelected, noticeUI, setAttributes } = props;

			return (
				<div className={ className }>
				<Placeholder
					children={ 'this' }
					label={ __( 'Augmented Reality Viewer', 'augmented-reality' ) }
					instructions={ __( 'Please select both files', 'augmented-reality' ) }
					icon={ 'gallery' }
					className={ 'foo' }
					notices={ noticeUI }
				>
					{ ! objUrl ? (

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
									{ __( 'Upload .obj file', 'augmented-reality' ) }
								</Button>
							) }
						>
						</MediaUpload>

					) : (

						<div class="image-wrapper">
							<span>{ objUrl.match( /[^\/]+\.obj+$/ ) ? objUrl.match( /[^\/]+\.obj+$/ )[0] : null }</span>

							{ !! objUrl ? (

								<Button
									className="button button-large"
									onClick={ () => {
										setAttributes({
											objId: null,
											objUrl: null,
										} );
									} }
								>
									{ __( 'Remove file', 'augmented-reality' ) }
								</Button>

							) : null }

						</div>
					) }

					{ ! mtlUrl ? (

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
									className="button button-large"
									onClick={ open }
								>
									{ __( 'Upload .mtl file', 'augmented-reality' ) }
								</Button>
							) }
						>
						</MediaUpload>

					) : (

						<div class="image-wrapper">
							<span>{ mtlUrl.match( /[^\/]+\.mtl+$/ ) ? mtlUrl.match( /[^\/]+\.mtl+$/ )[0] : null }</span>

							{ !! mtlUrl ? (

								<Button
									className="button button-large"
									onClick={ () => {
										setAttributes({
											mtlId: null,
											mtlUrl: null,
										} );
									} }
								>
									{ __( 'Remove file', 'augmented-reality' ) }
								</Button>

							) : null }

						</div>
					) }
				</Placeholder>
				</div>

			)
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
