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

( new Plugin() )->init();
