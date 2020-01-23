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
		$this->assertEquals( 10, has_action( 'wp_enqueue_scripts', [ $this->instance, 'ar_viewer_assets' ] ) );
		$this->assertEquals( 10, has_action( 'enqueue_block_editor_assets', [ $this->instance, 'block_editor_styles' ] ) );
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
					[ $this->instance, 'get_full_slug' ],
					$dependencies
				),
				$script->deps
			);
			$this->assertEquals( $handle, $script->handle );
			$this->assertContains( Plugin::SLUG . '/assets/vendor/' . $slug . '.js', $script->src );
			$this->assertEquals( Plugin::VERSION, $script->ver );

			// Ensure the localized data for utils.js is correct.
			if ( 'utils' === $slug ) {
				$data = $script->extra['data'];
				$this->assertContains(
					Asset::LOCALIZED_DATA_NAME,
					$data
				);
				$this->assertContains(
					wp_json_encode( [ 'anchorUrl' => $this->instance->plugin->plugin_url . '/assets/Anchor.png' ] ),
					$data
				);
			}
		}
	}

	/**
	 * Test get_full_slug().
	 *
	 * @covers Asset::get_full_slug().
	 */
	public function test_get_full_slug() {
		$first_slug  = 'foo';
		$second_slug = 'baz';
		$this->assertEquals( Plugin::SLUG . '-' . $first_slug, $this->instance->get_full_slug( $first_slug ) );
		$this->assertEquals( Plugin::SLUG . '-' . $second_slug, $this->instance->get_full_slug( $second_slug ) );
	}

	/**
	 * Test block_editor_styles().
	 *
	 * @covers Asset::block_editor_styles().
	 */
	public function test_block_editor_styles() {
		$expected_slug = Plugin::SLUG . '-' . Asset::EDITOR_STYLES_SLUG;
		$this->instance->block_editor_styles();
		$styles = wp_styles();
		$this->assertTrue( in_array( $expected_slug, $styles->queue, true ) );

		$stylesheet = $styles->registered[ $expected_slug ];
		$this->assertEquals( 'all', $stylesheet->args );
		$this->assertEquals( [], $stylesheet->deps );
		$this->assertEquals( [], $stylesheet->extra );
		$this->assertEquals( $expected_slug, $stylesheet->handle );
		$this->assertEquals( $this->instance->plugin->plugin_url . '/assets/css/' . Asset::EDITOR_STYLES_SLUG . '.css', $stylesheet->src );
		$this->assertEquals( Plugin::VERSION, $stylesheet->ver );
	}
}
