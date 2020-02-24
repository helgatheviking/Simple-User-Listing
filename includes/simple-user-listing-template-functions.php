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


/**
 * Open a link if the user has posts.
 *
 * @access public
 * @since 1.9.0
 * @param WP_User $user
 * @return boolean
 */
function sul_template_loop_author_link_open( $user ) {
	$num_posts = count_user_posts( $user->ID );
	$user_info = get_userdata( $user->ID );

	if ( $num_posts > 0 ) {

		printf( '<a href="%s" title="%s">', 
			get_author_posts_url( $user->ID ),
			sprintf( esc_attr__( 'Read posts by %s', 'simple-user-listing' ), $user_info->display_name )
		);
	}
}


/**
 * User avatar.
 *
 * @access public
 * @since 1.9.0
 * @param WP_User $user
 */
function sul_template_loop_author_avatar( $user ) {
	echo get_avatar( $user->ID, 90 );
}

/**
 * User name.
 *
 * @access public
 * @since 1.9.0
 * @param WP_User $user
 */
function sul_template_loop_author_name( $user ) {

	$num_posts = count_user_posts( $user->ID );

	$user_info = get_userdata( $user->ID );

	$display_name =$user_info->display_name;

	if ( $num_posts > 0 ) {
		$display_name .= ' <span class="post-count"><span class="hyphen">-</span>' . sprintf( _nx( '1 post', '%s posts', $num_posts, 'number of posts', 'simple-user-listing' ), $num_posts ) . '</span>';
	}

	echo '<h2>'. $display_name . '</h2>';
}

/**
 * Close a link if the user has posts.
 *
 * @access public
 * @since 1.9.0
 * @param WP_User $user
 */
function sul_template_loop_author_link_close( $user ) {
	$num_posts = count_user_posts( $user->ID );

	if ( $num_posts > 0 ) {
		echo '</a>';
	}
}


/**
 * Description
 *
 * @access public
 * @since 1.9.0
 * @param WP_User $user
 */
function sul_template_loop_author_description( $user ) {

	$description = get_user_meta( $user->ID, 'description', true );

	if( $description ) {
		echo '<p>' . wp_kses_post( $description ) . '</p>';
	}

}


/**
 * Description
 *
 * @access public
 * @since 1.9.0
 * @param WP_User $user
 */
function sul_template_loop_author_company( $user ) {

	$company = get_user_meta( $user->ID, 'billing_company', true );

	if( $company ) {
		echo '<p>Company: ' . wp_kses_post( $company ) . '</p>';
	}

}
add_action( 'sul_after_user_loop_author',        'sul_template_loop_author_company', 20 );

