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
Description: Adds blocks for augmented reality experiences.
Version: 0.1
Author: Ryan Kienstra
Author URI: https://ryankienstra.com
License: GPLv2
*/

require_once dirname( __FILE__ ) . '/php/class-plugin.php';

$plugin = Plugin::get_instance();
$plugin->init();
