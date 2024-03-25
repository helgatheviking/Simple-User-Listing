<?php

/**
 * Simple User Listing Template Functions.
 * 
 * @since 1.0.0
 * @version 2.0.0
 *
 * @package     Simple User Listing/Functions/Templates
 * @author      Kathy Darling
 * @copyright   Copyright (c) 2018, Kathy Darling
 * @license     http://opensource.org/licenses/gpl-3.0.php GNU Public License
 */


/**
 * Get template part
 *
 * @since 1.0
 * @param mixed $slug
 * @param string $name (default: '')
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
 * @since 1.0
 * @return boolean
 */
function is_user_listing() {
	global $post;

	$listing = false;

	if ( is_singular() && isset($post->post_content) && has_shortcode( $post->post_content, 'userlist' ) ) {
		$listing = true;
	}

	return apply_filters( 'sul_is_user_listing', $listing );
}

/**
 * Add body class
 *
 * @access public
 * @since 1.0.0
 * @param  array $c all generated WordPress body classes
 * @return array
 */
function sul_body_class( $c ) {
	if ( is_user_listing() ) {
		$c[] = 'userlist';

	}
	return $c;
}

/**
 * Add the search template
 *
 * @since 1.9.1
 */
function sul_template_user_search() {
	sul_get_template_part( 'search', 'author' );
}

/**
 * Add the open "wrapper" template
 *
 * @since 1.9.1
 */
function sul_template_user_loop_wrapper_open() {
	sul_get_template_part( 'open', 'author' );
}

/**
 * The user listing loop tenmplate.
 *
 * @since 1.9.1
 *
 * @param string $query_id
 * @param array $atts Attributes from shortcode.
 * @param WP_User[]
 */
function sul_template_user_loop( $query_id, $atts, $users ) {
	global $user;

	$template = isset( $atts['template'] ) ? $atts['template'] : 'author';

	if ( ! empty( $users ) )	 {
		$i = 0;
		// Loop through each author.
		foreach( $users as $user ){
			$user->counter = ++$i;
			sul_get_template_part( 'content', $template );
		}
	} else {
		sul_get_template_part( 'none', $template );
	}
}

/**
 * Add the close "wrapper" template
 *
 * @since 1.9.1
 */
function sul_template_user_loop_wrapper_close() {
	sul_get_template_part( 'close', 'author' );
}

/**
 * Add the navigation template
 *
 * @since 1.9.1
 */
function sul_template_user_navigation() {
	sul_get_template_part( 'navigation', 'author' );
}

/**
 * Open a link if the user has posts.
 *
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
 * @since 1.9.0
 * @param WP_User $user
 */
function sul_template_loop_author_avatar( $user ) {
	echo get_avatar( $user->ID, 90 );
}

/**
 * User name.
 *
 * @since 1.9.0
 * @param WP_User $user
 */
function sul_template_loop_author_name( $user ) {

	$num_posts = count_user_posts( $user->ID );

	$user_info = get_userdata( $user->ID );

	$display_name = esc_html( $user_info->display_name );

	if ( $num_posts > 0 ) {
		$display_name .= ' <span class="post-count"><span class="hyphen">-</span>' . sprintf( _nx( '1 post', '%s posts', $num_posts, 'number of posts', 'simple-user-listing' ), $num_posts ) . '</span>';
	}

	echo '<h2 class="author-name">'. $display_name . '</h2>';
}

/**
 * Close a link if the user has posts.
 *
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
 * @since 1.9.0
 * @param WP_User $user
 */
function sul_template_loop_author_description( $user ) {

	$description = get_user_meta( $user->ID, 'description', true );

	if ( $description ) {
		echo '<p class="author-description">' . wp_kses_post( $description ) . '</p>';
	}

}


/**
 * Description
 *
 * @since 1.9.0
 * @param WP_User $user
 */
function sul_template_loop_author_company( $user ) {

	$company = get_user_meta( $user->ID, 'billing_company', true );

	if ( $company ) {
		echo '<p>' . sprintf( esc_attr__( 'Company: %s', 'simple-user-listing' ), wp_kses_post( $company ) ) . '</p>';
	}

}
