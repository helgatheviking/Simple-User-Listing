<?php 

/**
 * Simple User Listing Block Functions. 
 * 
 * @package     Simple User Listing/Functions/Templates
 * @author      Kathy Darling
 * @copyright   Copyright (c) 2018, Kathy Darling
 * @license     http://opensource.org/licenses/gpl-3.0.php GNU Public License  
 */

 /**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function sul_create_block_init() {

	register_block_type( plugin_dir_path( SUL_PLUGIN_FILE ) . 'build' );

	// Load available translations.
	//wp_set_script_translations( 'createwithrani-superlist-block-editor-script-js', 'simple-user-listing );
}
add_action( 'init', 'sul_create_block_init' );