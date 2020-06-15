// @ts-check

/**
 * WordPress dependencies
 */
import {
	ColorPalette,
	InspectorControls,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * The Edit component for the block.
 *
 * @param {{attributes: {autoRotate: boolean, backgroundColor: string, className: string, id: number, url: string}, clientId: string, setAttributes: Function}} props Component props.
 * @return {Object} The component to render the block in the block editor.
 */
const Edit = ( {
	attributes: { autoRotate, backgroundColor, className, id, url },
	clientId,
	setAttributes,
} ) => {
	const labels = {
		title: !! url
			? __( 'Edit model', 'augmented-reality' )
			: __( 'Model', 'augmented-reality' ),
		instructions: __(
			'Upload a model file, or choose one from your media library',
			'augmented-reality'
		),
	};
	const allowedMimeTypes = [ 'application/glb', 'model/gltf+json' ];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Model Settings', 'augmented-reality' ) }
				>
					<label htmlFor={ `mv-background-color-${ clientId }` }>
						{ __( 'Background Color', 'augmented-reality' ) }
					</label>
					<ColorPalette
						id={ `mv-background-color-${ clientId }` }
						label={ __( 'Background Color', 'augmented-reality' ) }
						onChange={ ( newColor ) =>
							setAttributes( { backgroundColor: newColor } )
						}
						// @ts-ignore
						value={ backgroundColor }
					/>
					<ToggleControl
						checked={ autoRotate }
						onChange={ ( newValue ) =>
							setAttributes( { autoRotate: newValue } )
						}
						label={ __( 'Auto-rotate', 'augmented-reality' ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={ className }>
				<MediaPlaceholder
					accept={ allowedMimeTypes.join() }
					allowedTypes={ allowedMimeTypes }
					onSelect={ ( newMedia ) => {
						setAttributes( {
							url: newMedia.url,
							id: newMedia.id,
						} );
					} }
					icon="embed-generic"
					labels={ labels }
					mediaPreview={
						!! url && (
							// @ts-ignore
							<model-viewer
								src={ url }
								background-color={ backgroundColor }
								camera-controls
								auto-rotate={ autoRotate }
							/>
						)
					}
					onSelectURL={ ( newUrl ) => {
						if ( newUrl !== url ) {
							setAttributes( {
								url: newUrl,
								id: undefined,
							} );
						}
					} }
					value={ id }
				/>
			</div>
		</>
	);
};

export default Edit;
