/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Edit from './edit';

// Mock the <InpectorControls> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = require.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		InspectorControls: ( { children } ) => children,
	};
} );

const baseProps = { attributes: {} };
const setup = ( props ) => {
	return render( <Edit { ...props } /> );
};

describe( 'Edit', () => {
	it( 'displays the color pallete text', () => {
		setup( baseProps );
		expect( screen.getByText( 'Background Color' ) ).toBeInTheDocument();
	} );

	it( 'displays the instructions, even if there is no url or id', () => {
		setup( baseProps );
		expect( screen.getByText( 'Upload a model file, or choose one from your media library' ) ).toBeInTheDocument();
	} );

	it.each( [
		[ 'https://foo.com', 'Edit model' ],
		[ '', 'Model' ],
	] )( 'displays the correct title, depending on whether there is a url', ( url, expectedTitle ) => {
		setup( { attributes: { url } } );
		expect( screen.getByText( expectedTitle ) ).toBeInTheDocument();
	} );

	it( 'does not display a preview of the model-viewer if there is no url', () => {
		setup( baseProps );
		expect( document.getElementsByTagName( 'model-viewer' ) ).toHaveLength( 0 );
	} );

	it( 'displays a preview of the model-viewer if there is a url', () => {
		setup( { attributes: { url: 'https://baz.com' } } );

		const modelViewer = document.getElementsByTagName( 'model-viewer' );
		expect( modelViewer ).toHaveLength( 1 );
	} );
} );
