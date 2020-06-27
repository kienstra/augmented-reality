/**
 * External dependencies
 */
import * as React from 'react';

/**
 * WordPress dependencies
 */
import {
	ColorPalette,
	InspectorControls,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'model-viewer': ModelViewerProps;
		}
	}
}

interface ModelViewerProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes< HTMLElement >,
		HTMLElement
	> {
	src: string;
	'background-color'?: string;
	'camera-controls'?: boolean;
	'auto-rotate'?: boolean;
}

interface BlockAttributes {
	autoRotate: boolean;
	backgroundColor: string;
	className: string;
	id: number;
	url: string;
}

/**
 * The Edit component for the block.
 */
const Edit: React.ComponentType< BlockEditProps< BlockAttributes > > = ( {
	attributes: { autoRotate, backgroundColor, className, id, url },
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
					<label htmlFor="mv-background-color">
						{ __( 'Background Color', 'augmented-reality' ) }
					</label>
					<ColorPalette
						onChange={ ( newColor ) => {
							// @ts-ignore: type definition is wrong.
							setAttributes( { backgroundColor: newColor } );
						} }
						// @ts-ignore type definition is wrong.
						value={ backgroundColor }
					/>
					<ToggleControl
						checked={ autoRotate }
						onChange={ ( newValue ) =>
							setAttributes( { autoRotate: newValue } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div className={ className }>
				<MediaPlaceholder
					accept={ allowedMimeTypes.join() }
					allowedTypes={ allowedMimeTypes }
					onSelect={ ( newMedia: { url: string; id: number } ) => {
						setAttributes( {
							url: newMedia.url,
							id: newMedia.id,
						} );
					} }
					icon="embed-generic"
					labels={ labels }
					mediaPreview={
						!! url && (
							<model-viewer
								src={ url }
								background-color={ backgroundColor }
								camera-controls
								auto-rotate={ autoRotate }
							/>
						)
					}
					onSelectURL={ ( newUrl: string ) => {
						if ( newUrl !== url ) {
							setAttributes( {
								url: newUrl,
								id: undefined,
							} );
						}
					} }
					// @ts-ignore: type definition is wrong.
					value={ { id, name } }
				/>
			</div>
		</>
	);
};

export default Edit;
