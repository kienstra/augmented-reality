/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Placeholder } = wp.components;
const { Component } = wp.element;

/**
 * Internal dependencies
 */
import MediaControl from './media-control';

/**
 * The Edit component for the block.
 */
class Edit extends Component {
	/**
	 * Constructs the class.
	 */
	constructor() {
		super( ...arguments );
		this.setFile = this.setFile.bind( this );
	}

	/**
	 * Sets the new file name.
	 *
	 * @param {string} fileType The type of the file, like 'obj'.
	 * @param {string|null} fileName The name of the file, if any.
	 */
	setFile( fileType, fileName ) {
		const { setAttributes } = this.props;
		const attributes = {};

		attributes[ fileType + 'Url' ] = fileName;
		setAttributes( attributes );
	}

	/**
	 * Renders the component.
	 *
	 * @return {Function} The JSX of the component.
	 */
	render() {
		const { attributes: { objUrl, mtlUrl }, className, noticeUI } = this.props;

		return (
			<div className={ className }>
				<Placeholder
					label={ __( 'Augmented Reality Viewer', 'augmented-reality' ) }
					instructions={ ! objUrl || ! mtlUrl ? __( 'Please select both files', 'augmented-reality' ) : null }
					icon={ 'gallery' }
					notices={ noticeUI }
				>
					<MediaControl url={ objUrl } fileType="obj" setFile={ this.setFile } />
					<MediaControl url={ mtlUrl } fileType="mtl" setFile={ this.setFile } />
				</Placeholder>
			</div>
		);
	}
}

export default Edit;
