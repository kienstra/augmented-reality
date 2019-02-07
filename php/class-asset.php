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
		add_action( 'enqueue_block_assets', array( $this, 'ar_viewer_assets' ) );
	}

	/**
	 * Test ar_viewer_assets().
	 *
	 * @covers Plugin::ar_viewer_assets().
	 */
	public function ar_viewer_assets() {
		foreach ( $this->js_files as $slug => $dependencies ) {
			wp_enqueue_script(
				Plugin::SLUG . '-' . $slug,
				$this->plugin->plugin_url . '/assets/js/' . $slug . '.js',
				array_map(
					function( $dependency_slug ) {
						return Plugin::SLUG . '-' . $dependency_slug;
					},
					$dependencies
				),
				Plugin::VERSION,
				true
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
}
