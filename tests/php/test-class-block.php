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
		$this->instance = new Block( Plugin::get_instance() );
	}

	/**
	 * Test init().
	 *
	 * @covers init.
	 */
	public function test_init() {
		$this->instance->init();
		$this->assertEquals( 10, has_action( 'enqueue_block_editor_assets', array( $this->instance, 'block_editor_assets' ) ) );
	}

	/**
	 * Test block_editor_assets().
	 *
	 * @covers Plugin::block_editor_assets().
	 */
	public function test_block_editor_assets() {
		$this->instance->block_editor_assets();
		$scripts = wp_scripts();
		$i = $scripts;
		$this->assertTrue( in_array( Block::JS_SLUG, $scripts->queue ) );

		$script = $scripts->registered[ Block::JS_SLUG ];
		$this->assertEquals(
			array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ),
			$script->deps
		);
		$this->assertEmpty( $script->extra );
		$this->assertEquals( BLOCK::JS_SLUG, $script->handle );
		$this->assertEquals( BLOCK::JS_SLUG, $script->handle );
		$this->assertContains( Plugin::SLUG . '/assets/js/' . Block::JS_SLUG . '.js', $script->src );
		$this->assertEquals( Plugin::VERSION, $script->ver );
	}
}
