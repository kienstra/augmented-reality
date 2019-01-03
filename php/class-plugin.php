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
	const VERSION = '0.1';

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
	public $component;

	/**
	 * The instance of this class.
	 *
	 * @var Plugin
	 */
	public static $instance;

	/**
	 * Gets the instance of this plugin.
	 *
	 * @return Plugin $instance The plugin instance.
	 */
	public static function get_instance() {
		if ( ! self::$instance instanceof Plugin ) {
			self::$instance = new Plugin();
		}
		return self::$instance;
	}

	/**
	 * Initiate the plugin.
	 */
	public function init() {
		$this->load_files();
		$this->init_classes();
		$this->plugin_url = plugins_url( self::SLUG );
		add_action( 'init', array( $this, 'plugin_localization' ) );
	}

	/**
	 * Loads the plugin files.
	 *
	 * @return void.
	 */
	public function load_files() {
		require_once dirname( __FILE__ ) . '/class-block.php';
	}

	/**
	 * Instantiates and initializes the classes.
	 *
	 * @return void.
	 */
	public function init_classes() {
		$this->component        = new \stdClass();
		$this->component->block = new Block( self::$instance );
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
