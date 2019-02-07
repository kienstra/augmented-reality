<?php
/**
 * Tests for class Plugin.
 *
 * @package AugmentedReality
 */

namespace AugmentedReality;

/**
 * Tests for class Plugin.
 */
class Test_Plugin extends \WP_UnitTestCase {

	/**
	 * Instance of plugin.
	 *
	 * @var Plugin
	 */
	public $plugin;

	/**
	 * Setup.
	 *
	 * @inheritdoc
	 */
	public function setUp() {
		parent::setUp();
		$this->plugin = new Plugin();
	}

	/**
	 * Test init().
	 *
	 * @covers Plugin::init().
	 */
	public function test_init() {
		$this->plugin->init();
		$this->assertNotEquals( false, did_action( 'load_textdomain' ) );
		$this->assertContains( Plugin::SLUG, $this->plugin->plugin_url );
	}

	/**
	 * Test init_classes().
	 *
	 * @covers Plugin::init_classes().
	 */
	public function test_init_classes() {
		$this->plugin->init_classes();
		foreach ( $this->plugin->classes as $class ) {
			$this->assertEquals( __NAMESPACE__ . '\\' . $class, get_class( $this->plugin->components->$class ) );
		}
	}

	/**
	 * Test plugin_localization().
	 *
	 * @covers Plugin::plugin_localization().
	 */
	public function test_plugin_localization() {
		$this->plugin->plugin_localization();
		$this->assertNotEquals( false, did_action( 'load_textdomain' ) );
	}
}
