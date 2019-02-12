<?php
/**
 * Class Plugin
 *
 * @package AugmentedReality
 */

namespace AugmentedReality;

/**
 * Class Plugin
 *
 * @package AugmentedReality
 */
class Plugin {

	/**
	 * The version of the plugin.
	 *
	 * @var string
	 */
	const VERSION = '0.1.0';
	/**
	 * The slug of the plugin.
	 *
	 * @var string
	 */
	const SLUG = 'augmented-reality';

	/**
	 * The textdomain of the plugin.
	 *
	 * @var string
	 */
	const TEXTDOMAIN = 'augmented-reality';

	/**
	 * The URL of the plugin.
	 *
	 * @var string
	 */
	public $plugin_url;

	/**
	 * The instantiated classes of the plugin.
	 *
	 * @var \stdClass
	 */
	public $components;

	/**
	 * This plugin's PHP classes.
	 *
	 * @var array
	 */
	public $classes = array( 'Asset', 'Block' );

	/**
	 * Initiate the plugin.
	 */
	public function init() {
		$this->init_classes();
		$this->plugin_url = plugins_url( self::SLUG );
		add_action( 'init', array( $this, 'plugin_localization' ) );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	}

	/**
	 * Inits the plugin classes.
	 */
	public function init_classes() {
		$this->components = new \stdClass();
		foreach ( $this->classes as $class ) {
			$class_with_namespace = __NAMESPACE__ . '\\' . $class;

			if ( class_exists( $class_with_namespace ) ) {
				$this->components->$class = new $class_with_namespace( $this );
			} else {
				break;
			}

			if ( method_exists( $this->components->$class, 'init' ) ) {
				$this->components->$class->init();
			}
		}
	}

	/**
	 * Load the textdomain for the plugin, enabling translation.
	 *
	 * @return void.
	 */
	public function plugin_localization() {
		load_plugin_textdomain( 'adapter-responsive-video', false, basename( dirname( __FILE__ ) ) . '/languages' );
	}
}
