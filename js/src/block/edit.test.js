/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Edit from './edit';

const baseProps = { attributes: {} };
const setup = ( props ) => {
	return render( <Edit { ...props } /> );
};

const instructions = 'Upload a model file, or choose one from your media library';

describe( 'Edit', () => {
	it( 'displays the instructions, even if there is no url or id', () => {
		setup( baseProps );
		expect( screen.getByText( instructions ) ).toBeInTheDocument();
	} );

	it.each( [
		[ 'https://foo.com', 'Edit model' ],
		[ '', 'Model' ],
	] )( 'displays the correct title, depending on whether there is a url', ( url, expectedTitle ) => {
		setup( {
			...baseProps,
			attributes: { url },
		} );

		expect( screen.getByText( expectedTitle ) ).toBeInTheDocument();
	} );

	it( 'does not display a preview of the model-viewer if there is no url', () => {
		setup( baseProps );
		expect( document.getElementsByTagName( 'model-viewer' ) ).toHaveLength( 0 );
	} );

	it( 'displays a preview of the model-viewer if there is a url', () => {
		setup( {
			...baseProps,
			attributes: {
				url: 'https://baz.com',
			},
		} );

		const modelViewer = document.getElementsByTagName( 'model-viewer' );
		expect( modelViewer ).toHaveLength( 1 );
	} );
} );
