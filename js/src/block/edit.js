/**
 * WordPress dependencies
 */
import { ColorPalette, InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * The Edit component for the block.
 */
const Edit = ( { attributes: { autoRotate, backgroundColor, className, id, url }, instanceId, setAttributes } ) => {
	const labels = {
		title: !! url ? __( 'Edit model', 'augmented-reality' ) : __( 'Model', 'augmented-reality' ),
		instructions: __( 'Upload a model file, or choose one from your media library', 'augmented-reality' ),
	};
	const allowedMimeTypes = [ 'application/glb', 'model/gltf+json' ];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Model Settings', 'augmented-reality' ) }>
					<label htmlFor={ `mv-background-color-${ instanceId }` } >
						{ __( 'Background Color', 'augmented-reality' ) }
					</label>
					<ColorPalette
						id={ `mv-background-color-${ instanceId }` }
						label={ __( 'Background Color', 'augmented-reality' ) }
						onChange={ ( newColor ) => setAttributes( { backgroundColor: newColor } ) }
						value={ backgroundColor }
					/>
					<ToggleControl
						checked={ autoRotate }
						id={ `mv-auto-rotate-${ instanceId }` }
						onChange={ ( newValue ) => setAttributes( { autoRotate: newValue } ) }
						style={ { 'margin-top': '20px' } }
						label={ __( 'Auto-rotate', 'augmented-reality' ) }
					>
					</ToggleControl>
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
					mediaPreview={ !! url && (
						<model-viewer
							src={ url }
							background-color={ backgroundColor }
							camera-controls
							auto-rotate={ autoRotate }
						>
						</model-viewer>
					) }
					onSelectURL={ ( newUrl ) => {
						if ( newUrl !== url ) {
							setAttributes( {
								url: newUrl,
								id: undefined,
							} );
						}
					} }
					value={ { id, url } }
				/>
			</div>
		</>
	);
};

export default Edit;
