<?php
/**
 * Class Asset
 *
 * @package AugmentedReality
 */

namespace AugmentedReality;

/**
 * Class Asset
 *
 * @package AugmentedReality
 */
class Asset {

	/**
	 * The name of the localized data for the utils.js script.
	 *
	 * @var string
	 */
	const LOCALIZED_DATA_NAME = 'augmentedReality';

	/**
	 * The slug of the editor stylesheet.
	 *
	 * @var string
	 */
	const EDITOR_STYLES_SLUG = 'editor-styles';

	/**
	 * JavaScript files
	 *
	 * @var array {
	 *    The JavaScript files to enqueue.
	 *
	 *    @type string $slug The slug of the file.
	 *    @type array  $dependencies The file's dependencies.
	 *
	 * }
	 */
	public $js_files = array(
		'three'     => array(),
		'OBJLoader' => array( 'three' ),
		'MTLLoader' => array( 'three', 'OBJLoader' ),
		'utils'     => array( 'three', 'OBJLoader', 'MTLLoader' ),
		'app'       => array( 'three', 'OBJLoader', 'MTLLoader', 'utils' ),
	);

	/**
	 * Asset constructor.
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
		add_action( 'wp_enqueue_scripts', array( $this, 'ar_viewer_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'block_editor_styles' ) );
	}

	/**
	 * Enqueues the front-end assets for the AR Viewer assets.
	 */
	public function ar_viewer_assets() {
		foreach ( $this->js_files as $slug => $dependencies ) {
			wp_register_script(
				Plugin::SLUG . '-' . $slug,
				$this->plugin->plugin_url . '/assets/js/vendor/' . $slug . '.js',
				array_map(
					array( $this, 'get_full_slug' ),
					$dependencies
				),
				Plugin::VERSION,
				false
			);
		}

		wp_localize_script(
			Plugin::SLUG . '-utils',
			self::LOCALIZED_DATA_NAME,
			array(
				'anchorUrl' => $this->plugin->plugin_url . '/assets/Anchor.png'
			)
		);
	}

	/**
	 * Gets the slug of the asset prepended with the plugin name.
	 * For example, augmented-reality-app.
	 *
	 * @param string $asset_slug The slug of the asset.
	 * @return string $full_slug The slug of the asset, prepended with the plugin slug.
	 */
	public function get_full_slug( $asset_slug ) {
		return Plugin::SLUG . '-' . $asset_slug;
	}

	/**
	 * Enqueues the block editor.
	 */
	public function block_editor_styles() {
		wp_enqueue_style(
			Plugin::SLUG . '-' . self::EDITOR_STYLES_SLUG,
			$this->plugin->plugin_url . '/assets/css/' . self::EDITOR_STYLES_SLUG . '.css',
			array(),
			Plugin::VERSION
		);
	}
}
