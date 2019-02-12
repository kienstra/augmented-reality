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
	 * The file type of .mtl files.
	 *
	 * @var string
	 */
	const MTL_FILE_TYPE = 'application/mtl';

	/**
	 * The file type of .gbl files.
	 *
	 * @var string
	 */
	const GBL_FILE_TYPE = 'application/glb';

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
		add_action( 'init', array( $this, 'register_block' ) );
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
	 * Allow .obj and .mtl files, as they normally are not allowed.
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
		$ob_match      = preg_match( '/\.obj$/', $filename );
		$mtl_match     = preg_match( '/\.mtl$/', $filename );
		$do_allow_file = (
			( $ob_match || $mtl_match )
			&&
			extension_loaded( 'fileinfo' )
		);

		if ( ! $do_allow_file ) {
			return $wp_check_filetype_and_ext;
		}

		$finfo     = finfo_open( FILEINFO_MIME_TYPE );
		$real_mime = finfo_file( $finfo, $file );
		finfo_close( $finfo );

		// .obj files can have a $real_mime of 'text/plain', so allow that tile type.
		if ( 'text/plain' === $real_mime ) {
			if ( $ob_match ) {
				$wp_check_filetype_and_ext['ext']  = 'obj';
				$wp_check_filetype_and_ext['type'] = self::OBJ_FILE_TYPE;
			} elseif ( $mtl_match ) {
				$wp_check_filetype_and_ext['ext']  = 'mtl';
				$wp_check_filetype_and_ext['type'] = self::MTL_FILE_TYPE;
			}
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
		$mimes['mtl'] = self::MTL_FILE_TYPE;
		$mimes['glb'] = self::GBL_FILE_TYPE;
		return $mimes;
	}

	/**
	 * Registers the block.
	 */
	public function register_block() {
		if ( function_exists( 'register_block_type' ) ) {
			register_block_type(
				self::BLOCK_NAME,
				array(
					'attributes'      => array(
						'objUrl' => array(
							'type' => 'string',
						),
						'mtlUrl' => array(
							'type' => 'string',
						),
					),
					'render_callback' => array( $this, 'render_block' ),
				)
			);
		}
	}

	/**
	 * Renders the block.
	 *
	 * @param array $attributes The block attributes.
	 * @return string $markup The markup of the block.
	 */
	public function render_block( $attributes ) {
		if ( ! isset( $attributes['objUrl'], $attributes['mtlUrl'] ) ) {
			return;
		}

		ob_start();
		?>
		<div>
			<div id="enter-ar-info" class="demo-card mdl-card mdl-shadow--4dp" data-obj-url="<?php echo esc_url( $attributes['objUrl'] ); ?>" data-mtl-url="<?php echo esc_url( $attributes['mtlUrl'] ); ?>">
				<div class="mdl-card__actions mdl-card--border">
					<a id="enter-ar" class="mdl-button mdl-button--raised mdl-button--accent">
						<?php esc_html_e( 'Start augmented reality', 'augmented-reality' ); ?>
					</a>
				</div>
			</div>
			<div id="unsupported-info" style="display:none" class="demo-card mdl-card mdl-shadow--4dp">
				<div class="mdl-card__title">
					<h2 class="mdl-card__title-text"><?php esc_html_e( 'Unsupported Browser', 'augmented-reality' ); ?></h2>
				</div>
				<div class="mdl-card__supporting-text">
					<?php esc_html_e( 'Your browser does not support AR features with WebXR.', 'augmented-reality' ); ?>
				</div>
			</div>
			<div id="stabilization"></div>
			<div id="ar-canvas"></div>
		</div>

		<?php
		wp_print_scripts( $this->plugin->components->Asset->get_full_slug( 'app' ) );
		return ob_get_clean();
	}
}
