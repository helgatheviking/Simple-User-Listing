=== Simple User Listing  ===
Contributors: helgatheviking
Donate link: https://www.paypal.me/kathyisawesome
Tags: users, authors, directory
Requires at least: 6.1.0
Tested up to: 6.5.0
Stable tag: 2.0.3
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

A shortcode for displaying paginated lists of users.

== Description ==

Other plugins output paginated lists of users, but I needed to be able to customize and style this list to fit my theme.  So I created this plugin to use templates that can be overridden and customized by theme developers.

To customize any of the templates, copy the file from the plugin's "templates" folder to your themes "simple-user-listing" folder. 

= Usage =

Place this shortcode anywhere you'd like to display a full list of all your blog's users.

`
[userlist]
`

By default the plugin will print out the users based on the "Posts per Page" setting under Settings->Reading, but this and many other settings can be changed via the shortcode's parameters. 

= Support =

If after reading the [FAQ](http://wordpress.org/plugins/simple-user-listing/faq) you still need help, support is handled in the [WordPress forums](http://wordpress.org/support/plugin/simple-user-listing). Please note that support is limited and does not cover any custom implementation of the plugin. 

Please report any bugs, errors, warnings, code problems to [Github](https://github.com/helgatheviking/simple-user-listing/issues)

== Installation ==

1. Upload the `plugin` folder to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress
1. Add the shortcode [userlist] anywhere you wish to display a list of users

== Frequently Asked Questions ==

<a id="templates" name="templates"></a>
= How Can I Customize the Output? =

The whole reason I wrote this was that other similar plugins had too much control over the output.  You can style the output anyway you'd like by adding your own template parts to your theme.

Copy the files you wish to modify from the `simple-user-listing/templates` folder of the plugin and paste them into a `simple-user-listing` folder in the root of your theme (so `my-theme/simple-user-listing`).  Now you can change the markup any way you please.  It will be similar to template parts for post loops, except you will have access to each user's `$user` object instead of the $post object.

For more details on what is available in the `$user` object [see the Codex reference on WP_User()](http://codex.wordpress.org/Class_Reference/WP_User)

<a id="remove-search" name="remove-search"></a>
= How Do I Remove the Search Input? =

There are two ways to remove the search input. The search is added to a hook by the plugin, so you can remove it by adding the following to your theme's `functions.php` file:

`
function remove_SUL_search() {
    remove_action( 'simple_user_listing_before_loop',   'sul_template_user_search' );
}
add_action( 'simple_user_listing_before_loop', 'remove_SUL_search', 5 );
`

Or you could copy the `search-author.php` from the plugin's template folder to a `simple-user-listing folder` in your theme (so `simple-user-listing/searcch-author.php`) and remove all the code from it so that it is blank. 

<a id="parameters" name="parameters"></a>
= Shortcode Paramaters: How Can I Customize the User Query? =

Simple User Listing supports most of the parameters of the `WP_User_Query` class as parameters for the shortcode.  For example you can pass it a role defining which type of users you'd like to list.  You can also adjust the number of users displayed per page. Roles must be in lowercase. 

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
'query_id' => 'simple_user_listing', // This allows for targeted filtering of pre_get_user which allows for very custom queries.
'role' => '', // Multiple roles can be defined in a comma separated list [userlist role="infield,outfield"]
'role__in' => '', // Multiple roles can be defined in a comma separated list 
'role__not_in' => // Multiple roles can be defined in a comma separated list
'include' => '', // Multiple user IDs can be defined in a comma separated list
'exclude' => '', // Multiple user IDs can be defined in a comma separated lis
'blog_id' => '',
'number' => get_option( 'posts_per_page', 10 ),
'order' => 'ASC',
'orderby' => 'login',
'meta_key' => '',
'meta_value' => '',
'meta_compare' => '=',
'meta_type' => 'CHAR',
'count_total' => true,
'template' => 'author' // Corresponds to content-author.php template, can accept different templates per shortcode.
`

<a id="meta-sort" name="meta-sort"></a>
= How Can I Sort the Users by Last Name? =

As of verison 1.5.2 you could simply use the following as your shortcode:

`
[userlist meta_key="last_name" orderby="meta_value" order="ASC"]
`

<a id="meta-search" name="meta-search"></a>
= How can I search by a meta field? ex: Last Name =

While you could modify the `search-author.php` template, if you are only searching by one field it isn't really neccessary. You will, however, need to modify the shortcode's arguments for `WP_User_Query`.  You can do that by filtering `sul_user_query_args`.

Add the following to your theme's functions.php:

`
/**
 * Place this in your theme's functions.php file
 * Or a site-specific plugin
 *
 */
// Switch the WP_User_Query args to a meta search
function kia_meta_search( $args ) {

	// This $_GET is the name field of the custom input in search-author.php.
	$search = ( isset($_GET['as']) ) ? sanitize_text_field($_GET['as']) : false ;

	if ( $search ) {
		// If your shortcode has a 'role' parameter defined it will be maintained.
		// Unless you choose to unset the role parameter by uncommenting the following:
		//	unset( $args['role'] );
		$args['meta_key'] = 'last_name';
		$args['meta_value'] = $search;
		$args['meta_compare'] = '=';

		// Need to unset the original search args.
		if ( isset( $args['search'] ) ) unset($args['search']);
	}

	return $args;
}
add_filter( 'sul_user_query_args', 'kia_meta_search' );
`

Now the search will return users that match the entered "last_name".  You can adjust as needed or use the `meta_query` array for more complicated meta queries.  




<a id="display_name" name="display_name"></a>
= How Can I Search By Display Name? =
By default the WordPress search relies on username, though wih the `search_columns` parameter can be made to search the user's email or ID. Frankly, I think this is weird, but that's how WordPress works. 

It is much more useful to search by the user's display name, however this requires some trickery via the `pre_user_query` hook. Similar to `pre_get_posts` this is your last chance to change the `WP_User_Query` query before it is executed. I’ve built in a `query_id` variable so that you don’t go willy-nilly filtering all user queries which could have some unintended side effects.

`
// Switch user search from user_login to display_name via query_where 
function kia_search_users_by_display_name( $query ) {

  if ( isset( $query->query_vars['query_id'] ) && $query->query_vars['query_id'] === 'simple_user_listing' ) {
     $query->query_where = str_replace( "user_login", "display_name", $query->query_where );
  }

} 
add_action( 'pre_user_query', 'kia_search_users_by_display_name' ); 
`

<a id="advanced" name="advanced"></a>
= How to create very complex user queries | How to query multiple meta keys =

It isn't worth the effort to get the shortcode parameters to handle complex arrays. And in the end it isn't necessary as there are several filters in place to permit you to run a complex query. The key will be using the `query_id` parameter.

For example you could pass a specific ID via shortcode:

`
[userlist query_id="my_custom_meta_query"]
`

And then in your theme's `functions.php` or a site-specific plugin, you could filter the user query args:

`
add_filter( 'sul_user_query_args', 'sul_custom_meta_query', 10, 2 );

function sul_custom_meta_query( $args, $query_id ) {
	// Checking the query ID allows us to only target a specific shortcode.
	if ( $query_id === 'my_custom_meta_query' ) {
		$args['meta_query'] = array(
			'relation' => 'OR',
			array(
				'key'       => 'billing_city',
				'value'     => 'oslo',
				'compare'   => '=',
				'type'      => 'CHAR',
			),
			array(
				'key'       => 'first_name',
				'value'     => 'bobby',
				'compare'   => '=',
				'type'      => 'CHAR',
			)
		);
	}
	return $args;
}
`

For complex queries, you will want to read the [WP Codex reference on WP_User_Query](http://codex.wordpress.org/Class_Reference/WP_User_Query#Parameters).

<a id="pagination" name="pagination"></a>
= Does Simple User Listing work with WP_Pagenavi? =

Yes! [WP Pagenavi](http://wordpress.org/plugins/wp-pagenavi/) supports pagination for `WP_User_Query` and I configured the navigation-author.php template to automatically use WP Pagenavi if it is installed and activated.

<a name="permalinks"></a>
= I can't get the search users to work? =

The search form will not work with the default permalinks. Try changing your permalinks to some other structure.  The reason is form submits via the GET method and so adding those parameters to the URL seem to clash with the parameters already on the URL from the default permalink setup.

<a id="fix-search" name="fix-search"></a>
= S2 Member Conflicts | The search doesn't respect the shortcode parameters =

Likely you are experiencing a conflict with another plugin, specifically one that is filtering `pre_user_query` to modify all user queries. The S2 Member plugin is a known culprit of this. To disable S2 Member's modifications on all Simple User Listing lists, add the following to your theme's functions.php or to a site-specific plugin. Ensure you are using at least SUL 1.5.3.

`
function kia_protect_sul_from_s2() {
	remove_action('pre_user_query', 'c_ws_plugin__s2member_users_list::users_list_query');
}
add_action( 'simple_user_listing_before_loop', 'kia_protect_sul_from_s2' );

function kia_restore_s2() {
	add_action('pre_user_query', 'c_ws_plugin__s2member_users_list::users_list_query');
}
add_action( 'simple_user_listing_after_loop', 'kia_restore_s2' );
`

== Changelog ==

= 2.0.3 =
* Fix: No plugin changes. Fix SVN chaos caused by autodeploy scripts.

= 2.0.2 =
* New: Bump tested WordPress version to 6.5
* Fix: Try deploy one more time :/

= 2.0.1 =
* Fix: Deploy build routine failure :/

= 2.0.0 =
* New: Introduce first pass at block editor support. Supports relatively simple queries only. Complex queries (including based on user meta) will still need to use the shortcode.

= 1.9.3 =
* Fix: Additional sanitization/security fixes. Props @WPprodigy.

= 1.9.2 =
* Fix: Sanitize 'as' input value in search-author.php form.

= 1.9.1 =
* New: Move all template functions out of main class. @see: includes/simple-user-listing-template-functions.php
* New: Attach all template functiosn to hooks on after_setup_theme hook. @see: includes/simple-user-listing-template-hooks.php

= 1.9.0 =
* New: Add hooks in content-author.php
* New: use define( 'SUL_QUERY_DEBUG_MODE', true ); to bypass transients for debugging.

= 1.8.5 =
* New: Display entire user loop on new `simple_user_listing_loop` hook. 
* New: Accept passing custom templates for the author template via `template="template-name"`.
* Fix: Add support for `has_published_post` user query parameter.

= 1.8.4 =
* Fix: Use core WordPress function page_num_link() to generate navigation links.

= 1.8.3 =
* New: Filter the users output via `simple_user_listing_users` filter. Props @Birmania.
* Fix: Use custom get_current_url() instead of permalinks to generate navigation links.
* Fix: `simple_user_listing_before_shortcode` and `simple_user_listing_after_shortcode` hooks should now work, though by working they should now be redundant. Please continue using `simple_user_listing_before_loop` and `simple_user_listing_after_loop`. 

= 1.8.2 =
* New: Use different content templates per shortcode via template shortcode parameter. Props @nerdworker. 
* Ex: [userlist template="tacos"] looks for a simple-user-listing/content-tacos.php template in your theme.
* New: Add filter sul_get_template_part

= 1.8.1 =
* Fix: Role broken parameter sanitization. Replace santize_text_input with actual function sanitize_text_field

= 1.8.0 =
* New: Add support for `role__in` and `role__not_in` parameters
* New: Add wrapper div for easy grid styling
* Update donation link
* Update required and tested against versions

= 1.7.4 =
* remove stray }
* restore transients in repo

= 1.7.3 =
* use array of attributes instead of extract()
* pass attributes to sul_user_query_args filter. allows for more custom queries, ex: User Taxonomies: https://git.io/vKsW6

= 1.7.2 =
* Clear transients when a user is deleted

= 1.7.1 =
* only show author description if exists
* tested up to WordPress 4.4.0

= 1.7.0 =
* Use transients to cache queries

= 1.6.3 =
* Add Finnish translation. props @Teemu Jönkkäri

= 1.6.2 =
* Add Danish translation. props @Frank Pedersen

= 1.6.1 =
* move simple_user_listing_before_loop to after query is run to have pagination available

= 1.6.0 =
* Remove is_page() restriction on shortcode display. Can now be echoed anywhere.

= 1.5.4 =
* fix untranslatable strings in templates
* stop linking to authors that have no posts (this causes 404)
* change content-author.php template
* update docs

= 1.5.3 =
* use has_shortcode() built-in function for is_user_listing()
* move simple_user_listing_before_loop hook so that S2 member can be disabled for SUL

= 1.5.2 =
* separate meta_key param so you can sort by meta_value from shortcode

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