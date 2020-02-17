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
	 * The slug of the block JS file.
	 *
	 * @var string
	 */
	const BLOCK_JS_SLUG = 'block';

	/**
	 * The slug of the block JS file.
	 *
	 * @var string
	 */
	const MODEL_VIEWER_JS_SLUG = 'model-viewer';

	/**
	 * The slug of the editor stylesheet.
	 *
	 * @var string
	 */
	const EDITOR_STYLES_SLUG = 'editor-styles';

	/**
	 * The plugin.
	 *
	 * @var Plugin
	 */
	public $plugin;

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
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_scripts' ] );
	}

	/**
	 * Registers the scripts for the block.
	 *
	 * Not simply enqueued here, as one of the scripts also is enqueued
	 * in the 'render_callback' of the block.
	 */
	public function enqueue_block_editor_scripts() {
		foreach ( [ self::BLOCK_JS_SLUG, self::MODEL_VIEWER_JS_SLUG ] as $slug ) {
			$this->enqueue_script( $slug );
		}
	}

	/**
	 * Enqueues a script by its slug.
	 *
	 * @param string $slug The slug of the script.
	 */
	public function enqueue_script( $slug ) {
		$config = $this->get_script_config( self::MODEL_VIEWER_JS_SLUG );
		\wp_enqueue_script(
			$this->get_prefixed_slug( $slug ),
			$this->plugin->get_script_path( $slug ),
			$config['dependencies'],
			$config['version'],
			true
		);
	}

	/**
	 * Gets the slug of the asset, prefixed with the plugin slug.
	 * For example, 'augmented-reality-block'.
	 *
	 * @param string $asset_slug The slug of the asset.
	 * @return string $full_slug The slug of the asset, prepended with the plugin slug.
	 */
	private function get_prefixed_slug( $asset_slug ) {
		return Plugin::SLUG . '-' . $asset_slug;
	}

	/**
	 * Gets the config of the script, including dependencies.
	 *
	 * @param string $slug The slug of the script.
	 * @return array The config of the script.
	 */
	private function get_script_config( $slug ) {
		$plugin_path = $this->plugin->get_dir();
		return require "{$plugin_path}/js/dist/{$slug}.asset.php";
	}
}
