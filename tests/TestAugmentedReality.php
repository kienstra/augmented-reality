<?php
/**
 * Tests for augmented-reality.php.
 *
 * @package AugmentedReality
 */

namespace AugmentedReality;

/**
 * Tests for augmented-reality.php.
 */
class TestAugmentedReality extends \WP_UnitTestCase {

	/**
	 * Test _augmented_reality_build_notice().
	 *
	 * @covers _augmented_reality_build_notice.
	 */
	public function test_augmented_reality_build_notice() {
		ob_start();
		_augmented_reality_build_notice();
		$output = ob_get_clean();

		$this->assertContains( '<div class="notice notice-error">', $output );
		$this->assertContains( 'It looks like the Augmented Reality plugin is not built.', $output );
	}
}
