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
	const JS_SLUG = 'editor-blocks';

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
	}

	/**
	 * Enqueues the block editor assets.
	 */
	public function block_editor_assets() {
		$slug = 'editor-blocks';
		$url  = $this->plugin->plugin_url . '/assets/js/' . $slug . '.js';

		wp_enqueue_script(
			$slug,
			$url,
			array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ),
			Plugin::VERSION
		);
	}
}
