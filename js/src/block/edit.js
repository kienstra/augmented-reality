/**
 * WordPress dependencies
 */
import { ColorPalette, InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * The Edit component for the block.
 */
const Edit = ( { attributes: { backgroundColor, className, id, url }, setAttributes } ) => {
	const labels = {
		title: !! url ? __( 'Edit model', 'augmented-reality' ) : __( 'Model', 'augmented-reality' ),
		instructions: __( 'Upload a model file, or choose one from your media library', 'augmented-reality' ),
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Background Color', 'augmented-reality' ) }>
					<ColorPalette
						value={ backgroundColor }
						onChange={ ( newColor ) => {
							setAttributes( { backgroundColor: newColor } );
						} }
						clearable={ false }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={ className }>
				<MediaPlaceholder
					allowedTypes={ [ 'application/glb' ] }
					onSelect={ ( newMedia ) => {
						setAttributes( {
							url: newMedia.url,
							id: newMedia.id,
						} );
					} }
					icon="embed-generic"
					labels={ labels }
					mediaPreview={ !! url && <model-viewer src={ url } background-color={ backgroundColor } camera-controls auto-rotate></model-viewer> }
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
