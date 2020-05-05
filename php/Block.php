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
	 * The name of the block.
	 *
	 * @var string
	 */
	const BLOCK_NAME = 'augmented-reality/ar-viewer';

	/**
	 * The plugin.
	 *
	 * @var Plugin
	 */
	public $plugin;

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
		add_action( 'init', [ $this, 'register_block' ] );
		add_action( 'wp_check_filetype_and_ext', [ $this, 'check_filetype_and_ext' ], 10, 3 );
	}

	/**
	 * Registers the block as a dynamic block, with a render_callback.
	 */
	public function register_block() {
		if ( function_exists( 'register_block_type' ) ) {
			register_block_type(
				self::BLOCK_NAME,
				[
					'attributes'      => [
						'url'             => [
							'type' => 'string',
						],
						'id'              => [
							'type' => 'number',
						],
						'backgroudnColor' => [
							'tyep' => 'string',
						],
					],
					'render_callback' => [ $this, 'render_block' ],
				]
			);
		}
	}

	/**
	 * Gets the markup of the dynamic 'AR Viewer' block, including its scripts.
	 *
	 * @param array $attributes The block attributes.
	 * @return string|null $markup The markup of the block.
	 */
	public function render_block( $attributes ) {
		if ( ! isset( $attributes['url'] ) ) {
			return;
		}

		ob_start();
		?>
		<model-viewer
			src="<?php echo esc_attr( $attributes['url'] ); ?>"
			camera-controls
			auto-rotate
			<?php if ( isset( $attributes['backgroundColor'] ) ) : ?>
				background-color="<?php echo esc_attr( $attributes['backgroundColor'] ); ?>"
			<?php endif; ?>
		>
		</model-viewer>
		<?php

		$this->plugin->components->Asset->enqueue_script( Asset::MODEL_VIEWER_JS_SLUG );
		return ob_get_clean();
	}

	/**
	 * Allow .obj and .mtl files, as they normally are not allowed.
	 *
	 * @param array  $wp_check_filetype_and_ext {
	 *      The file data.
	 *
	 *     @type string    $ext The file extension.
	 *     @type string    $type The file type.
	 *     @type string    $proper_filename The proper file name.
	 * }
	 * @param string $file The full path of the file.
	 * @param string $filename The file name.
	 * @return array The filtered file data.
	 */
	public function check_filetype_and_ext( $wp_check_filetype_and_ext, $file, $filename ) {
		$is_gbl        = preg_match( '/\.glb$/', $filename );
		$do_allow_file = $is_gbl && extension_loaded( 'fileinfo' );

		if ( ! $do_allow_file ) {
			return $wp_check_filetype_and_ext;
		}

		$finfo     = finfo_open( FILEINFO_MIME_TYPE );
		$real_mime = finfo_file( $finfo, $file );
		finfo_close( $finfo );

		// .glf files can have this as an actual mime_type, so allow this.
		$wp_check_filetype_and_ext['ext']  = 'glb';
		$wp_check_filetype_and_ext['type'] = 'application/octet-stream';

		return $wp_check_filetype_and_ext;
	}
}
