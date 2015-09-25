<?php
/*
Plugin Name: Simple User Listing
Plugin URI: http://www.kathyisawesome.com/489/simple-user-listing/
Description: Create a simple shortcode to list our WordPress users.
Author: Kathy Darling
Version: 1.7.0
Author URI: http://kathyisawesome.com
License: GPL2
Text Domain: simple-user-listing

Copyright 2015  Kathy Darling  (email: kathy.darling@gmail.com)

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

		/* 
		 * variables 
		 */
		public $plugin_path;
		public $template_url;
		public $allowed_search_vars;

		/*
		 * constructor
		 */

		public function __construct() {

			add_action( 'plugins_loaded', array( $this, 'load_text_domain' ) );
			add_shortcode( 'userlist', array( $this, 'shortcode_callback' ) );
			add_action( 'simple_user_listing_before_loop', array( $this, 'add_search' ) );
			add_action( 'simple_user_listing_after_loop', array( $this, 'add_nav' ) );
			add_filter( 'body_class', array( $this, 'body_class' ) );
			add_filter( 'query_vars', array( $this, 'user_query_vars' ) );

			add_action( 'profile_update', array( $this, 'delete_user_transients' ) );
			add_action( 'user_register', array( $this, 'delete_user_transients' ) );
			add_action( 'save_post', array( $this, 'delete_user_transients' ) );
			
		}

		/**
		 * Make plugin ready for translation
		 *
		 * @access public
		 * @since 1.0
		 * @return none
		 */
		function load_text_domain() {
			load_plugin_textdomain( 'simple-user-listing', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		}

		/**
		 * Get the plugin path.
		 *
		 * @access public
		 * @since 1.0
		 * @return string
		 */
		function plugin_path() {
			if ( $this->plugin_path ) return $this->plugin_path;

			return $this->plugin_path = untrailingslashit( plugin_dir_path( __FILE__ ) );
		}

		/**
		 * Get the template url
		 * @access public
		 * @since 1.3
		 * @return string
		 */
		function template_url() {
			if ( $this->template_url ) return $this->template_url;

			return $this->template_url = trailingslashit( apply_filters( 'sul_template_url', 'simple-user-listing' ) );
		}

		/**
		 * Get Allowed Search Args
		 * @access public
		 * @since 1.3
		 * @return array
		 */
		function allowed_search_vars() {
			if ( $this->allowed_search_vars ) return $this->allowed_search_vars;

			return $this->allowed_search_vars = apply_filters( 'sul_user_allowed_search_vars', array( 'as' ) );
		}

		/**
		 * Callback for the shortcode
		 *
		 * @access public
		 * @since 1.0
		 * @param  array $atts shortcode attributes
		 * @param  string $content shortcode content, null for this shortcode
		 * @return string
		 */
		function shortcode_callback( $atts, $content = null ) {
			global $post, $sul_users, $user;

			extract( shortcode_atts( array(
				'query_id' => 'simple_user_listing',
				'role' => '',
				'include' => '',
				'exclude' => '',
				'blog_id' => '',
				'number' => get_option( 'posts_per_page', 10 ),
				'order' => 'ASC',
				'orderby' => 'login',
				'meta_key' => '',
				'meta_value' => '',
				'meta_compare' => '=',
				'meta_type' => 'CHAR',
				'count_total' => true,
			), $atts ) );

			$number = intval( $number );

			// We're outputting a lot of HTML, and the easiest way
			// to do it is with output buffering from PHP.
			ob_start();

			// Get the Search Term
			$search = ( isset( $_GET['as'] ) ) ? sanitize_text_field( $_GET['as'] ) : false ;

			// Get Query Var for pagination. This already exists in WordPress
			$page = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' )  : 1;

			// Calculate the offset (i.e. how many users we should skip)
			$offset = ( $page - 1 ) * $number;

			// args
			$args = array(
				'query_id' => $query_id,
				'offset' => $offset,
				'number' => $number,
				'orderby' => $orderby,
				'order' => $order,
				'count_total' => $count_total,
			);

			// if $role parameter is defined
			if( $role ){ 
				$args['role'] = sanitize_text_field( $role );
			}

			// if $blog_id parameter is defined
			if( $blog_id ){
				$args['blog_id'] = intval( $blog_id );
			}

			// if $includ parameter is defined
			if( $include ){
				$include = array_map( 'trim', explode( ',', $include ) );
				$args['include'] = $include;
			}

			// if $exclude parameter is defined
			if( $exclude ){
				$exclude = array_map( 'trim', explode( ',', $exclude ) );
				$args['exclude'] = $exclude;
			}

			// if meta search parameters are defined
			if ( $meta_key && $meta_value ) {
				$args['meta_query'] = array(
												array(
													'key'       => $meta_key,
													'value'     => $meta_value,
													'compare'   => $meta_compare,
													'type'      => $meta_type,
												),
											);
			} elseif( $meta_key ){
				$args['meta_key'] = $meta_key;
			}

			// Generate the query based on search field
			if ( $search ){
				$args['search'] = '*' . $search . '*';
			}

			// allow themes/plugins to filter the query args (probably redundant in light of pre_user_query filter, but still)
			$args = apply_filters( 'sul_user_query_args', $args, $query_id );

			// Generate a transient name based on current query
			$transient_name = 'sul_query_' . md5( http_build_query( $args ) . $this->get_transient_version( 'sul_user_query' ) );
			$transient_name = ( is_search() ) ? $transient_name . '_s' : $transient_name;

			if ( false === ( $sul_users = get_transient( $transient_name ) ) ) {
				
				// the query itself
				$sul_users = new WP_User_Query( $args );

				set_transient( $transient_name, $sul_users, DAY_IN_SECONDS * 30 );
			}
		
			// The authors object.
			$users = $sul_users->get_results();

			// before the user listing loop
			do_action( 'simple_user_listing_before_loop', $query_id );

			// the user listing loop
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

			// after the user listing loop
			do_action( 'simple_user_listing_after_loop', $query_id );

			// Output the content.
			$output = ob_get_contents();
			ob_end_clean();

			do_action( 'simple_user_listing_before_shortcode', $post, $query_id );
			return $output;
			do_action( 'simple_user_listing_after_shortcode', $post, $query_id );

		}

		/**
		 * Add the search template
		 *
		 * @access public
		 * @since 1.0
		 * @return null
		 */
		function add_search() {
			sul_get_template_part( 'search', 'author' );
		}

		/**
		 * Add the navigation template
		 *
		 * @access public
		 * @since 1.0
		 * @return null
		 */
		function add_nav(){
			sul_get_template_part( 'navigation', 'author' );
		}


		/**
		 * Add body class
		 *
		 * @access public
		 * @since 1.0
		 * @param  array $c all generated WordPress body classes
		 * @return array
		 */
		function body_class( $c ) {
		    if( is_user_listing() ) {
		        $c[] = 'userlist';

		    }
		    return $c;
		}

		/**
		 * Register the search query var
		 *
		 * @access public
		 * @since 1.3
		 * @param  array $query_vars variables recognized by WordPress
		 * @return array
		 */
		function user_query_vars( $query_vars )	{
			if( is_array( $this->allowed_search_vars() ) ) foreach( $this->allowed_search_vars() as $var ){
				$query_vars[] = $var;
			}
			return $query_vars;
		}

		/**
		 * Get Total Pages in User Query
		 *
		 * @access public
		 * @since 1.3
		 * @return number
		 */
		public function get_total_user_pages(){

			global $sul_users;

			$total_pages = 1;

			if( $sul_users && ! is_wp_error( $sul_users ) ){

				// Get the total number of authors. Based on this, offset and number
				// per page, we'll generate our pagination.
				$total_authors = $sul_users->get_total();

				// authors per page from query
				$number = intval ( $sul_users->query_vars['number'] ) ? intval ( $sul_users->query_vars['number'] ) : 1;

				// Calculate the total number of pages for the pagination (use ceil() to always round up)
				$total_pages =  ceil( $total_authors / $number );

			}

			return $total_pages;

		}

		/**
		 * Get Previous users
		 *
		 * @access public
		 * @since 1.3
		 * @return URL string
		 */
		public function get_previous_users_url(){
			global $sul_users;

			// Get Query Var for pagination. This already exists in WordPress
			$page = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;

			// start with nothing
			$previous_url = false;

			// there is no previous link on page 1
			if ( $page > 1 ) {

				// add paging
				$previous_url = add_query_arg( 'paged', $page - 1, get_permalink() );

				// add search params
				$previous_url = $this->add_search_args( $previous_url );

			}

			return $previous_url;

		}

		/**
		 * Get Next users
		 * 
		 * @access public
		 * @since 1.3
		 * @return URL string
		 */
		public function get_next_users_url(){
			global $sul_users;

			// Get Query Var for pagination. This already exists in WordPress
			$page = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;

			// start with nothing
			$next_url = false;

			// there is no next link on last page
			if ( $page < $this->get_total_user_pages() ) {

				// add paging
				$next_url = add_query_arg( 'paged', $page + 1, get_permalink() );

				// add search params
				$next_url = $this->add_search_args( $next_url );

			}

			return $next_url;
		}

		/**
		 * Add search args to URL
		 * 
		 * @access public
		 * @since 1.0
		 * @param  string $url the permalink to which we should add the allowed $_GET variables
		 * @return URL string
		 */
		public function add_search_args( $url ){
			global $sul_users;

			// if this is a search query, preserve the query args
			if ( ! empty( $_GET ) ) {

				// get all the search query variables ( just the ones in the $_GET that we've whitelisted )
				$search = array_intersect_key( $_GET, array_flip( $this->allowed_search_vars() ) );

				if ( ! empty ( $search ) )
					$url = add_query_arg( (array)$search, $url );

			}
			return $url;
		}

		/**
		 * Get transient version
		 *
		 * When using transients with unpredictable names, e.g. those containing an md5
		 * hash in the name, we need a way to invalidate them all at once.
		 *
		 * borrowed from WooCommerce
		 * Raised in issue https://github.com/woothemes/woocommerce/issues/5777
		 * Adapted from ideas in http://tollmanz.com/invalidation-schemes/
		 *
		 * @param  string  $group   Name for the group of transients we need to invalidate
		 * @param  boolean $refresh true to force a new version
		 * @since  1.7.0
		 * @return string transient version based on time(), 10 digits
		 */
		public function get_transient_version( $group, $refresh = false ) {
			$transient_name  = $group . '-transient-version';
			$transient_value = get_transient( $transient_name );

			if ( false === $transient_value || true === $refresh ) {
				$transient_value = time();
				set_transient( $transient_name, $transient_value );
			}
			return $transient_value;
		}


		/**
		 * Delete user transients when needed
		 * @since  1.7.0
		 */
		public function delete_user_transients() {
			// Increments the transient version to invalidate cache
			$this->get_transient_version( 'sul_user_query', true );

			// If not using an external caching system, we can clear the transients out manually and avoid filling our DB
			if ( ! wp_using_ext_object_cache() ) {
				global $wpdb;

				$wpdb->query( "
					DELETE FROM `$wpdb->options`
					WHERE `option_name` LIKE ('\_transient\_sul\_query\_%')
				" );
			}

		}

	}
}
global $simple_user_listing;
$simple_user_listing = new Simple_User_Listing();



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
	global $simple_user_listing;
	$template = '';

	// Look in yourtheme/slug-name.php and yourtheme/simple-user-listing/slug-name.php
	if ( $name )
		$template = locate_template( array ( "{$slug}-{$name}.php", "{$simple_user_listing->template_url()}{$slug}-{$name}.php" ) );
	if ( !$template && $name && file_exists( $simple_user_listing->plugin_path() . "/templates/{$slug}-{$name}.php" ) )
		$template = $simple_user_listing->plugin_path() . "/templates/{$slug}-{$name}.php";

	// If template file doesn't exist, look in yourtheme/slug.php and yourtheme/simple_user_listing/slug.php
	if ( !$template )
		$template = locate_template( array ( "{$slug}.php", "{$simple_user_listing->template_url()}{$slug}.php" ) );

	if ( $template )
		load_template( $template, false );

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