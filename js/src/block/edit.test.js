/**
 * External dependencies
 */
import 'react';
import { render } from 'react-dom';

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

/**
 * Renders the tested component, given the passed props.
 *
 * @param {Object} props The props to pass to the component.
 * @return {Object} The created wrapper element.
 */
const setup = ( props ) => {
	const wrapper = document.createElement( 'div' );
	render( <Edit { ...props } />, wrapper );
	return wrapper;
};

/**
 * Whether the element has text in its .textContent.
 *
 * @param {Object} element The container in which to search for the text.
 * @param {string} text The text to search for.
 * @return {boolean} Whether the container has the text in its .textContent.
 */
const hasTextContent = ( element, text ) => {
	return -1 !== element.textContent.search( text );
};

const baseProps = { attributes: {} };

describe( 'Edit', () => {
	it( 'displays the color palette text', () => {
		const rendered = setup( baseProps );
		expect( hasTextContent( rendered, 'Background Color' ) ).toEqual( true );
	} );

	it( 'displays the instructions, even if there is no url or id', () => {
		const rendered = setup( baseProps );
		expect( hasTextContent( rendered, 'Upload a model file, or choose one from your media library' ) ).toEqual( true );
	} );

	it.each( [
		[ 'https://foo.com', 'Edit model' ],
		[ '', 'Model' ],
	] )( 'displays the correct title, depending on whether there is a url', ( url, expectedTitle ) => {
		const rendered = setup( { attributes: { url } } );
		expect( hasTextContent( rendered, expectedTitle ) ).toEqual( true );
	} );

	it( 'does not display a preview of the model-viewer if there is no url', () => {
		const rendered = setup( baseProps );
		expect( rendered.getElementsByTagName( 'model-viewer' ) ).toHaveLength( 0 );
	} );

	it( 'displays a preview of the model-viewer if there is a url', () => {
		const rendered = setup( { attributes: { url: 'https://baz.com' } } );

		const modelViewer = rendered.getElementsByTagName( 'model-viewer' );
		expect( modelViewer ).toHaveLength( 1 );
	} );
} );
