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
		$this->plugin = Plugin::get_instance();
	}

	/**
	 * Test get_instance().
	 *
	 * @covers Plugin::get_instance().
	 */
	public function test_get_instance() {
		$this->assertEquals( Plugin::get_instance(), $this->plugin );
		$this->assertEquals( __NAMESPACE__ . '\Plugin', get_class( Plugin::get_instance() ) );

		// Ensure that get_instance() instantiates Plugin correctly when Plugin::$instance is null.
		Plugin::$instance = null;
		$instance         = Plugin::get_instance();
		$this->assertEquals( Plugin::$instance, $instance );
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
	 * Test load_files().
	 *
	 * @covers Plugin::load_files().
	 */
	public function test_load_files() {
		$this->assertTrue( class_exists( __NAMESPACE__ . '\\Block') );
	}

	/**
	 * Test init_classes().
	 *
	 * @covers Plugin::init_classes().
	 */
	public function test_init_classes() {
		$this->assertEquals( __NAMESPACE__ . '\\Block', get_class( $this->plugin->component->block ) );
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
