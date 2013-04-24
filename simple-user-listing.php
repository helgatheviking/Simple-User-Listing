<?php
/*
Plugin Name: Simple User Listing
Plugin URI: http://wordpress.org/extend/plugins/simple-user-listing/
Description: Create a simple shortcode to list our WordPress users.
Author: Kathy Darling
Version: 1.1.1
Author URI: http://kathyisawesome.com
License: GPL2


    Copyright 2013  Kathy Darling  (email: kathy.darling@gmail.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA



*/

/*
 * adapted from: Cristian Antohe
 * http://wp.smashingmagazine.com/2012/06/05/front-end-author-listing-user-search-wordpress/
 */

if ( ! class_exists( 'Simple_User_Listing' ) ) {

	class Simple_User_Listing {

		/**
		 * @var string
		 */
		var $template_url;

	    public function __construct() {

	    	// Variables
			$this->template_url			= trailingslashit( apply_filters( 'sul_template_url', 'simple-user-listing' ) );

			add_action('plugins_loaded', array( $this, 'load_text_domain' ) );

		   add_shortcode( 'userlist', array( $this, 'shortcode_callback' ) );
		   add_action( 'simple_user_listing_before_loop', array( $this, 'add_search' ) );
		   add_action( 'simple_user_listing_after_loop', array( $this, 'add_nav' ) );
		   add_filter( 'body_class', array( $this, 'body_class' ) );

	    }

		/**
		 * Get the plugin path.
		 *
		 * @access public
		 * @return none
		 */
		function load_text_domain() {
		 load_plugin_textdomain( 'simple-user-listing', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		}
		/**
		 * Get the plugin path.
		 *
		 * @access public
		 * @return string
		 */
		function plugin_path() {
			if ( $this->plugin_path ) return $this->plugin_path;

			return $this->plugin_path = untrailingslashit( plugin_dir_path( __FILE__ ) );
		}


		/**
		 * Callback for the shortcode
		 *
		 * @access public
		 * @return string
		 */
		function shortcode_callback($atts, $content = null) {
			global $post, $sul_users, $user;

			extract(shortcode_atts(array(
				"role" => '',
				"number" => get_option( 'posts_per_page', 10 ),
			), $atts));

			$role = sanitize_text_field($role);
			$number = sanitize_text_field($number);

			// We're outputting a lot of HTML, and the easiest way
			// to do it is with output buffering from PHP.
			ob_start();

			// Get the Search Term
			$search = ( isset($_GET["as"]) ) ? sanitize_text_field($_GET["as"]) : false ;

			// Get Query Var for pagination. This already exists in WordPress
			$page = (get_query_var('paged')) ? get_query_var('paged') : 1;

			// Calculate the offset (i.e. how many users we should skip)
			$offset = ($page - 1) * $number;

			$args1 = array( 'query_id' => 'simple_user_listing' );

			if ($search){
				// Generate the query based on search field
				$args2 =
					array(
						'search' => '*' . $search . '*'
					);
			} else {
				// Generate the query
				$args2 =
					array(
						'role' => $role,
						'offset' => $offset,
						'number' => $number,
					);
			}

			$args = apply_filters( 'sul_user_query_args', array_merge( $args1, $args2 ) );

			$sul_users = new WP_User_Query( $args );

			// The authors object.
			$users = $sul_users->get_results();

			do_action( 'simple_user_listing_before_loop' );

			if ( ! empty( $users ) )	 {
				$i = 0;
				// loop through each author
				foreach( $users as $user ){
					$user->counter = ++$i;
					sul_get_template_part( 'content', 'author' );
				}
			} else {
				sul_get_template_part( 'none', 'author' );
			} //endif

			do_action( 'simple_user_listing_after_loop' );

			// Output the content.
			$output = ob_get_contents();
			ob_end_clean();

			// Return only if we're inside a page. This won't list anything on a post or archive page.
			if ( is_page() ) {
				do_action( 'simple_user_listing_before_shortcode', $post );
				echo $output;
				do_action( 'simple_user_listing_after_shortcode', $post );
			}
		}

		function add_search() {
			sul_get_template_part( 'search', 'author' );
		}

		function add_nav(){
			sul_get_template_part( 'navigation', 'author' );
		}


		/**
		 * Add body class
		 */
		function body_class( $c ) {

		    if( is_user_listing() ) {
		        $c[] = 'userlist';

		    }

		    return $c;
		}

	}
}
global $simple_user_listing;
$simple_user_listing = new Simple_User_Listing();



/**
 * Get template part
 *
 * @access public
 * @param mixed $slug
 * @param string $name (default: '')
 * @return void
 */
function sul_get_template_part( $slug, $name = '' ) {
	global $simple_user_listing;
	$template = '';

	// Look in yourtheme/slug-name.php and yourtheme/simple-user-listing/slug-name.php
	if ( $name )
		$template = locate_template( array ( "{$slug}-{$name}.php", "{$simple_user_listing->template_url}{$slug}-{$name}.php" ) );
	if ( !$template && $name && file_exists( $simple_user_listing->plugin_path() . "/templates/{$slug}-{$name}.php" ) )
		$template = $simple_user_listing->plugin_path() . "/templates/{$slug}-{$name}.php";

	// If template file doesn't exist, look in yourtheme/slug.php and yourtheme/simple_user_listing/slug.php
	if ( !$template )
		$template = locate_template( array ( "{$slug}.php", "{$simple_user_listing->template_url}{$slug}.php" ) );

	if ( $template )
		load_template( $template, false );

}

/**
 * Is User listing?
 *
 * @access public
 * @return boolean
 */
function is_user_listing(){
	global $post;

	$listing = false;

	if( is_page() && isset($post->post_content) && false !== stripos($post->post_content, '[userlist')) {
		$listing = true;
	}

	return apply_filters( 'sul_is_user_listing', $listing );
}