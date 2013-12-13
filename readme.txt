=== Simple User Listing  ===
Contributors: helgatheviking
Donate link: https://inspirepay.com/pay/helgatheviking
Tags: users, authors
Requires at least: 3.8
Tested up to: 3.8
Stable tag: 1.5.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

A shortcode for displaying paginated lists of users.

== Description ==

Other plugins output paginated lists of users, but I needed to be able to customize and style this list to fit my theme.  So I created this plugin to use templates that can be overridden and customized by theme developers.

= Usage =

Place this shortcode anywhere you'd like to display a full list of all your blog's users.

`
[userlist]
`

By default the plugin will split the users up based on the "Posts per Page" setting under Settings->Reading.

See the [FAQ](http://wordpress.org/plugins/simple-user-listing/faq/) for more details on how to modify the list results.

== Installation ==

1. Upload the `plugin` folder to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress
1. Add the shortcode [userlist] anywhere you wish to display a list of users

== Frequently Asked Questions ==

= I can't get the search users to work? =

The search form will not work with the default permalinks. Try changing your permalinks to some other structure.  The reason is form submits via the GET method and so adding those parameters to the URL seem to clash with the parameters already on the URL from the default permalink setup.

= How Can I Customize the User Query? =

Simple User Listing supports most of the parameters of the `WP_User_Query` class as parameters for the shortcode.  For example you can pass it a role defining which type of users you'd like to list.  You can also adjust the number of users displayed per page.

`
[userlist role="author" number="5"]
`

As of version 1.2 you can now sort the user list by and of the sort parameters supported by `WP_User_Query()`.  For example, the following would list your users based on number of posts written, with the highest first.

`
[userlist orderby="post_count" order="DESC"]
`

As of version 1.4 you can now list users by a meta key. Be careful with this as this is not exactly an efficient query.

`
[userlist meta_key="foo" meta_value="widgets"]
`

As of version 1.4.2 you can now include and exclude users with a comma separated list of IDs.

`
[userlist exclude="1,2,3"]
`

The full list of supported parameters (shown with default value) is:

`
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
`

For more details on `WP_User_Query` parameters, so the [WP Codex reference on WP_User_Query](http://codex.wordpress.org/Class_Reference/WP_User_Query#Parameters).

= How Can I Customize the HTML/text, etc? =

The whole reason I wrote this was that other similar plugins had too much control over the output.  You can style the output anyway you'd like by adding your own template parts to your theme.

Copy the files you wish to modify from the `simple-user-listing/templates` folder of the plugin and paste them into a `simple-user-listing` folder in the root of your theme (so `my-theme/simple-user-listing`).  Now you can change the markup any way you please.  It will be similar to template parts for post loops, except you will have access to each user's `$user` object instead of the $post object.

For more details on what is available in the `$user` object [see the Codex reference on WP_User()](http://codex.wordpress.org/Class_Reference/WP_User)

= How can I setup custom search? (search by a meta field) =

First you need to change your search form.  You can do that by creating a new `search-authors.php` template in the `simple-user-listing` folder of your theme.

For example, if I wanted to search by the meta field "billing_city" I would have my search template look like the following:

`
<?php
/**
 * The Template for displaying Author Search
 *
 * Place this file in your theme
 * yourtheme/simple-user-listing/search-author.php
 *
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

$search = ( get_query_var( 'billing_city' ) ) ? get_query_var( 'billing_city' )  : '';

global $sul_users;
?>

<div class="author-search">
  <h2><?php _e('Search authors by city' ,'simple-user-listing');?></h2>
		<form method="get" id="sul-searchform" action="<?php the_permalink() ?>">
			<label for="as" class="assistive-text"><?php _e('Search' ,'simple-user-listing');?></label>

<input type="text" class="field" name="billing_city" id="sul-s" placeholder="<?php _e('Search Authors' ,'simple-user-listing');?>" value="<?php echo $search; ?>"/>

			<input type="submit" class="submit" id="sul-searchsubmit" value="<?php _e('Search Authors' ,'simple-user-listing');?>" />
		</form>
	<?php
	if( $search ){ ?>
		<h2 ><?php printf( __('Search Results for: %s' ,'simple-user-listing'), '<em>' . $search .'</em>' );?></h2>
		<a href="<?php the_permalink(); ?>"><?php _e('Back To Author Listing' ,'simple-user-listing');?></a>
	<?php } ?>
</div><!-- .author-search -->
`

Next you'll need to modify the shortcode's arguments for `WP_User_Query`.  You can do that by filtering `sul_user_query_args` and then adding your parameters to the Simple User Listing's whitelist by filtering `sul_user_query_args`.

Add the following to your theme's functions.php:

`
/**
 * Place this in your theme's functions.php file
 * Or a site-specific plugin
 *
 */
// Switch the WP_User_Query args to a meta search
function kia_meta_search( $args ){

  // this $_GET is the name field of the custom input in search-author.php
	$search = ( isset($_GET['billing_city']) ) ? sanitize_text_field($_GET['billing_city']) : false ;

	if ( $search ){
		// if your shortcode has a 'role' parameter defined it will be maintained
		// unless you choose to unset the role parameter by uncommenting the following
		//	unset( $args['role'] );
		$args['meta_key'] = 'billing_city';
		$args['meta_value'] = $search;
		$args['meta_compare'] = '=';
	}

	return $args;
}
add_filter('sul_user_query_args', 'kia_meta_search');

// Register query var and whitelist with Simple User Listing
function kia_search_vars( $vars ){
	$vars[] = 'billing_city';
	return $vars;
}
add_filter('sul_user_allowed_search_vars', 'kia_search_vars');
`

Now the search will return users that match the entered "billing_city".  You can adjust as needed for more complicated meta queries.

== Bug Reporting ==

Please report any issues at: https://github.com/helgatheviking/simple-user-listing/issues

== Changelog ==

= 1.5.1 =
* tested against WordPress 3.8
* French translation (by me, so open to improvement!)
* German translation props @Nico Bartes

= 1.5 =
* improved docbloc 
* fixed conflicting blog_id/role parameters

= 1.4.2 =
* Support for include and exclude parameters

= 1.4.1 =
* Move changelog back to readme.txt #facepalm

= 1.4 =
* Add support for meta queries and custom query IDs
* Rename list_id parameter to query_id
* Move changelog to separate file

= 1.3.3 =
* Fixed the content-author.php template

= 1.3.2 =
* Return shortcode instead of echo #facepalm

= 1.3.1 =
* Maintain role parameter on search

= 1.3 =
* Fix pagination on search
* Add support for WP_Pagenavi
* Better support for customizing meta search queries

= 1.2.2 =
* Add FAQ

= 1.2.1 =
* Fix readme.txt markdown

= 1.2 =
* Add support for orderby and order parameters

= 1.1.1 =
* Fix divide by zero warning in navigation-author.php template

= 1.1 =
* Add translation .pot
* Fix "1 posts" error in content-author.php template
* HTML encode arrows in navigation-author.php template

= 1.0 =
* Initial release.