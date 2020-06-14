<?php
/**
 * Class Plugin
 *
 * @package AugmentedReality
 */

namespace AugmentedReality;

use stdClass;

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
	 * The file path of the plugin.
	 *
	 * @var string
	 */
	private $plugin_path;

	/**
	 * The directory of the plugin.
	 *
	 * @var string
	 */
	private $plugin_dir;

	/**
	 * This plugin's PHP classes.
	 *
	 * @var array
	 */
	private $classes = [ 'Asset', 'Block' ];

	/**
	 * The instantiated classes of the plugin.
	 *
	 * @var stdClass
	 */
	public $components;

	/**
	 * Plugin constructor.
	 *
	 * @param string $file_path The plugin's file path.
	 */
	public function __construct( $file_path ) {
		$this->plugin_path = $file_path;
		$this->plugin_dir  = dirname( $file_path );
	}

	/**
	 * Initiates the plugin.
	 */
	public function init() {
		add_action( 'init', [ $this, 'plugin_localization' ] );
		$this->init_classes();
	}

	/**
	 * Inits the plugin classes.
	 */
	public function init_classes() {
		$this->components = new stdClass();
		foreach ( $this->classes as $class ) {
			$class_with_namespace     = __NAMESPACE__ . '\\' . $class;
			$this->components->$class = new $class_with_namespace( $this );
			$this->components->$class->init();
		}
	}

	/**
	 * Load the textdomain for the plugin, enabling translation.
	 *
	 * @return void.
	 */
	public function plugin_localization() {
		load_plugin_textdomain( self::TEXTDOMAIN, false, basename( dirname( __FILE__ ) ) . '/languages' );
	}

	/**
	 * Gets the filesystem path of the plugin.
	 *
	 * @return string The path of the plugin.
	 */
	public function get_path() {
		return $this->plugin_path;
	}

	/**
	 * Gets the filesystem path of the plugin.
	 *
	 * @return string The path of the plugin.
	 */
	public function get_dir() {
		return $this->plugin_dir;
	}

	/**
	 * Gets the path of a script, given its slug.
	 *
	 * @param string $slug The slug of the script.
	 * @return string The path of the script.
	 */
	public function get_script_path( $slug ) {
		return plugins_url( "js/dist/{$slug}.js", $this->plugin_path );
	}
}
