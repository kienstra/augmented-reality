/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { MediaUpload } = wp.editor;
const { Button } = wp.components;

/**
 * The component to display the controls for the file.
 *
 * @param {Object} props The component props.
 * @param {string} props.url The URL of the viewer.
 * @param {string} props.fileType The file type of the viewer, like obj.
 * @param {Function} props.setFile Sets the new file.
 * @return {Function} THe JSX of the component.
 */
const MediaControl = ( { url, fileType, setFile } ) => {
	// Get only the file name and extension, for example foo.obj instead of path/to/foo.obj.
	const simpleUrl = !! url && url.match( '[^\\/]+\\.+' + fileType + '$' ) ? url.match( '[^\\/]+\\.+' + fileType + '$' )[ 0 ] : '';

	return (
		<div className="ar-viewer-wrapper">
			{ !! url ? (
				<div>
					<span>{ simpleUrl }</span>
					<Button
						className="button button-large"
						onClick={ () => {
							setFile( fileType, null );
						} }
					>
						{ sprintf( __( 'Remove %s file', 'augmented-reality' ), fileType ) }
					</Button>
				</div>
			) : (
				<MediaUpload
					onSelect={ ( img ) => {
						setFile( fileType, img.url );
					} }
					type="image"
					value={ url }
					render={ ( { open } ) => {
						return (
							<Button
								className={ 'button button-large' }
								onClick={ open }
							>
								{ sprintf( __( 'Select %s file', 'augmented-reality' ), fileType ) }
							</Button>
						);
					} }
				/>
			) }
		</div>
	);
};

export default MediaControl;
