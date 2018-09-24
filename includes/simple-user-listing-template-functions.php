<?php 

/**
 * Simple User Listing Core Functions. 
 * 
 * @package     Simple User Listing/Functions/Templates
 * @author      Kathy Darling
 * @copyright   Copyright (c) 2018, Kathy Darling
 * @license     http://opensource.org/licenses/gpl-3.0.php GNU Public License  
 */


/**
 * Get template part
 *
 * @access public
 * @since 1.0
 * @param mixed $slug
 * @param string $name (default: '')
 * @return null
 */
function sul_get_template_part( $slug, $name = '' ) {

	$sul = Simple_User_Listing::get_instance();

	$template = '';

	// Look in yourtheme/slug-name.php and yourtheme/simple-user-listing/slug-name.php
	if ( $name ){
		$template = locate_template( array ( "{$slug}-{$name}.php", "{$sul->template_url()}{$slug}-{$name}.php" ) );
	}
	
	if ( !$template && $name && file_exists( $sul->plugin_path() . "/templates/{$slug}-{$name}.php" ) ){
		$template = $sul->plugin_path() . "/templates/{$slug}-{$name}.php";
	}

	// If template file doesn't exist, look in yourtheme/slug.php and yourtheme/simple_user_listing/slug.php
	if ( !$template ){
		$template = locate_template( array ( "{$slug}.php", "{$sul->template_url()}{$slug}.php" ) );
	}

	// Allow 3rd party plugins to filter template file from their plugin.
	$template = apply_filters( 'sul_get_template_part', $template, $slug, $name );

	if ( $template ){
		load_template( $template, false );
	}

}

/**
 * Is User listing post/page?
 * Won't be true on archives
 *
 * @access public
 * @since 1.0
 * @return boolean
 */
function is_user_listing(){
	global $post;

	$listing = false;

	if( is_singular() && isset($post->post_content) && has_shortcode( $post->post_content, 'userlist' ) ) {
		$listing = true;
	}

	return apply_filters( 'sul_is_user_listing', $listing );
}
