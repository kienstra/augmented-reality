/**
 * External dependencies
 */
import { mount } from 'enzyme';

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
	return mount( <Edit { ...props } /> );
};

describe( 'Edit', () => {
	it( 'displays the color palette text', () => {
		const rendered = setup( baseProps );
		expect( rendered.contains( 'Background Color' ) ).toEqual( true );
	} );

	it( 'displays the instructions, even if there is no url or id', () => {
		const rendered = setup( baseProps );
		expect( rendered.contains( 'Upload a model file, or choose one from your media library' ) ).toEqual( true );
	} );

	it.each( [
		[ 'https://foo.com', 'Edit model' ],
		[ '', 'Model' ],
	] )( 'displays the correct title, depending on whether there is a url', ( url, expectedTitle ) => {
		const rendered = setup( { attributes: { url } } );
		expect( rendered.contains( expectedTitle ) ).toEqual( true );
	} );

	it( 'does not display a preview of the model-viewer if there is no url', () => {
		const rendered = setup( baseProps );
		expect( rendered.find( 'model-viewer' ) ).toHaveLength( 0 );
	} );

	it( 'displays a preview of the model-viewer if there is a url', () => {
		const rendered = setup( { attributes: { url: 'https://baz.com' } } );

		const modelViewer = rendered.find( 'model-viewer' );
		expect( modelViewer ).toHaveLength( 1 );
	} );
} );
