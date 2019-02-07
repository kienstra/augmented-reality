<?php
/**
 * Class Block
 *
 * @package AugmentedReality
 */

namespace AugmentedReality;

/**
 * Class Block
 *
 * @package AugmentedReality
 */
class Block {

	/**
	 * The slug of the JS file.
	 *
	 * @var string
	 */
	const JS_FILE_NAME = 'blocks-compiled';

	/**
	 * The file type of .obj files.
	 *
	 * @var string
	 */
	const OBJ_FILE_TYPE = 'application/obj';

	/**
	 * Block constructor.
	 *
	 * @param Plugin $plugin The instance of the plugin.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Inits the class.
	 */
	public function init() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'block_editor_assets' ) );
		add_action( 'mime_types', array( $this, 'add_mime_types' ) );
		add_action( 'wp_check_filetype_and_ext', array( $this, 'check_filetype_and_ext' ), 10, 3 );
	}

	/**
	 * Enqueues the block editor assets.
	 */
	public function block_editor_assets() {
		wp_enqueue_script(
			Plugin::SLUG . '-' . self::JS_FILE_NAME,
			$this->plugin->plugin_url . '/assets/js/' . self::JS_FILE_NAME . '.js',
			array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ),
			Plugin::VERSION
		);
	}

	/**
	 * Allow '.obj' files, as they normally are not allowed.
	 *
	 * @param array $wp_check_filetype_and_ext[] {
	 *     The file data.
	 *
	 *     @type string    $ext The file extension.
	 *     @type string    $type The file type.
	 *     @type string    $proper_filename The proper file name.
	 * }
	 * @param string $file                      The full path of the file.
	 * @param string $filename                  The file name.
	 * @return array $wp_check_filetype_and_ext The filtered file data.
	 */
	public function check_filetype_and_ext( $wp_check_filetype_and_ext, $file, $filename ) {
		if ( ! preg_match( '/\.obj$/', $filename ) || ! extension_loaded( 'fileinfo' ) ) {
			return $wp_check_filetype_and_ext;
		}

		$finfo     = finfo_open( FILEINFO_MIME_TYPE );
		$real_mime = finfo_file( $finfo, $file );
		finfo_close( $finfo );

		// .obj files can have a $real_mime of 'text/plain', so allow that tile type.
		if ( 'text/plain' === $real_mime ) {
			$wp_check_filetype_and_ext['ext']  = 'obj';
			$wp_check_filetype_and_ext['type'] = self::OBJ_FILE_TYPE;
		}

		return $wp_check_filetype_and_ext;
	}

	/**
	 * Adds 'obj' and 'glb' meme types.
	 *
	 * @param array $mimes The meme types.
	 * @return array $mimes The filtered meme types.
	 */
	public function add_mime_types( $mimes ) {
		$mimes['obj'] = self::OBJ_FILE_TYPE;
		$mimes['glb'] = 'application/glb';
		return $mimes;
	}
}
