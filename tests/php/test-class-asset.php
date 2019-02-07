<?php
/**
 * Tests for class Asset.
 *
 * @package AugmentedReality
 */

namespace AugmentedReality;

/**
 * Tests for class Asset.
 */
class Test_Asset extends \WP_UnitTestCase {

	/**
	 * Instance of Asset.
	 *
	 * @var Asset
	 */
	public $instance;

	/**
	 * Setup.
	 *
	 * @inheritdoc
	 */
	public function setUp() {
		parent::setUp();
		$plugin = new Plugin();
		$plugin->init();
		$this->instance = new Asset( $plugin );
	}

	/**
	 * Test __construct().
	 *
	 * @covers __construct.
	 */
	public function test_construct() {
		$this->assertEquals( __NAMESPACE__ . '\\Plugin', get_class( $this->instance->plugin ) );
	}

	/**
	 * Test init().
	 *
	 * @covers init.
	 */
	public function test_init() {
		$this->instance->init();
		$this->assertEquals( 10, has_action( 'enqueue_block_assets', array( $this->instance, 'ar_viewer_assets' ) ) );
	}

	/**
	 * Test ar_viewer_assets().
	 *
	 * @covers Plugin::ar_viewer_assets().
	 */
	public function test_ar_viewer_assets() {
		$this->instance->ar_viewer_assets();
		$scripts = wp_scripts();

		foreach ( $this->instance->js_files as $slug => $dependencies ) {
			$handle = Plugin::SLUG . '-' . $slug;
			$script = $scripts->registered[ $handle ];

			$this->assertEquals(
				array_map(
					function( $dependency_slug ) {
						return Plugin::SLUG . '-' . $dependency_slug;
					},
					$dependencies
				),
				$script->deps
			);
			$this->assertEquals( $handle, $script->handle );
			$this->assertContains( Plugin::SLUG . '/assets/js/' . $slug . '.js', $script->src );
			$this->assertEquals( Plugin::VERSION, $script->ver );

			// Ensure the localized data for utils.js is correct.
			if ( 'utils' === $slug ) {
				$data = $script->extra['data'];
				$this->assertContains(
					Asset::LOCALIZED_DATA_NAME,
					$data
				);
				$this->assertContains(
					wp_json_encode( array( 'anchorUrl' => $this->instance->plugin->plugin_url . '/assets/Anchor.png' ) ),
					$data
				);
			}
		}
	}
}
