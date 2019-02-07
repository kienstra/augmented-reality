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
Version: 0.1.0
Author: Ryan Kienstra
Author URI: https://ryankienstra.com
License: GPLv2
*/

require_once dirname( __FILE__ ) . '/vendor/autoload.php';

$plugin = new Plugin();
$plugin->init();
