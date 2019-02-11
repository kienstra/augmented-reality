<?php
/**
 * Tests for class Block.
 *
 * @package AugmentedReality
 */

namespace AugmentedReality;

/**
 * Tests for class Block.
 */
class Test_Block extends \WP_UnitTestCase {

	/**
	 * Instance of Block.
	 *
	 * @var Block
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
		$this->instance = new Block( $plugin );
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
		$this->assertEquals( 10, has_action( 'enqueue_block_editor_assets', array( $this->instance, 'block_editor_assets' ) ) );
		$this->assertEquals( 10, has_filter( 'wp_check_filetype_and_ext', array( $this->instance, 'check_filetype_and_ext' ) ) );
	}

	/**
	 * Test block_editor_assets().
	 *
	 * @covers Plugin::block_editor_assets().
	 */
	public function test_block_editor_assets() {
		$this->instance->block_editor_assets();
		$scripts = wp_scripts();
		$slug    = Plugin::SLUG . '-' . Block::JS_FILE_NAME;
		$script  = $scripts->registered[ $slug ];
		$this->assertTrue( in_array( $slug, $scripts->queue ) );

		$this->assertEquals(
			array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ),
			$script->deps
		);
		$this->assertEmpty( $script->extra );
		$this->assertEquals( $slug, $script->handle );
		$this->assertContains( Plugin::SLUG . '/assets/js/blocks-compiled.js', $script->src );
		$this->assertEquals( Plugin::VERSION, $script->ver );
	}

	/**
	 * Test add_mime_types().
	 *
	 * @covers Plugin::add_mime_types().
	 */
	public function test_add_mime_types() {
		$original_mime_types = array( 'gif' => 'image/gif' );
		$filtered_mimes      = $this->instance->add_mime_types( $original_mime_types );

		// The original mime types should still be present.
		$this->assertEmpty( array_diff( $original_mime_types, $filtered_mimes ) );
		$this->assertEquals( Block::OBJ_FILE_TYPE, $filtered_mimes['obj'] );
		$this->assertEquals( 'application/glb', $filtered_mimes['glb'] );
	}

	/**
	 * Test check_filetype_and_ext().
	 *
	 * @covers Plugin::check_filetype_and_ext().
	 */
	public function test_check_filetype_and_ext() {
		$initial_wp_check_filetype_and_ext = array(
			'ext'             => false,
			'type'            => false,
			'proper_filename' => false,
		);
		$wrong_filename                    = 'baz.gif';
		$file                              = "example/$wrong_filename";

		// This isn't an .obj file, so it should return the same value that it's passed.
		$this->assertEquals(
			$initial_wp_check_filetype_and_ext,
			$this->instance->check_filetype_and_ext( $initial_wp_check_filetype_and_ext, $file, $wrong_filename )
		);

		$correct_filename = 'example.obj';
		$file             = dirname( __DIR__ ) . '/fixtures/' . $correct_filename;

		// This now passes an .obj file, so the filtered value should be different.
		$this->assertEquals(
			array(
				'ext'             => 'obj',
				'type'            => 'application/obj',
				'proper_filename' => false,
			),
			$this->instance->check_filetype_and_ext( $initial_wp_check_filetype_and_ext, $file, $correct_filename )
		);

		$mtl_filename = 'baz.mtl';
		$file         = dirname( __DIR__ ) . '/fixtures/' . $mtl_filename;

		// This now passes an .obj file, so the filtered value should be different.
		$this->assertEquals(
			array(
				'ext'             => 'mtl',
				'type'            => 'application/mtl',
				'proper_filename' => false,
			),
			$this->instance->check_filetype_and_ext( $initial_wp_check_filetype_and_ext, $file, $mtl_filename )
		);
	}
}
