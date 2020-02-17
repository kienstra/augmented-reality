/**
 * WordPress dependencies
 */
import { MediaPlaceholder } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * The Edit component for the block.
 */
const Edit = ( { attributes: { className, id, url }, setAttributes } ) => {
	const labels = {
		title: ! url ? __( 'Model', 'augmented-reality' ) : __( 'Edit model', 'augmented-reality' ),
		instructions: __( 'Upload a model file, or choose one from your media library', 'augmented-reality' ),
	};

	return (
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
				mediaPreview={ !! url && <model-viewer src={ url } camera-controls auto-rotate></model-viewer> }
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
	);
};

export default Edit;
