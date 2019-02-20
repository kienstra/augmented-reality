<?php
/**
 * Plugin bootstrap file.
 *
 * @package AugmentedReality
 */

namespace AugmentedReality;

/*
Plugin Name: Augmented Reality
Plugin URI: https://github.com/kienstra/augmented-reality
Description: Augmented reality in a WordPress block. Upload any object, and see it in your room using your phone's camera.
Version: 0.1.0
Author: Ryan Kienstra
Author URI: https://ryankienstra.com
License: GPLv3
*/

require_once dirname( __FILE__ ) . '/vendor/autoload.php';

$plugin = new Plugin();
$plugin->init();

/**
 * Adds an admin notice if the Composer autoload file is not present.
 * Mainly taken from the Official AMP Plugin for WordPress.
 *
 * @see https://github.com/ampproject/amp-wp/blob/9a651b11baae1d9746a3af1f6998ef0b9c0689b2/amp.php#L72
 */
function _augmented_reality_build_notice() {
	?>
	<div class="notice notice-error">
		<p><?php esc_html_e( 'It looks like the Augmented Reality plugin is not built. Please run `composer install && npm install && npm run dev`.', 'augmented-reality' ); ?></p>
	</div>
	<?php
}
if ( ! file_exists( __DIR__ . '/vendor/autoload.php' ) || ! file_exists( __DIR__ . '/assets/js/blocks-compiled.js' ) ) {
	add_action( 'admin_notices', '_augmented_reality_build_notice' );
	return;
}
