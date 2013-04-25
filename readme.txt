=== Simple User Listing  ===
Contributors: helgatheviking
Donate link: https://inspirepay.com/pay/helgatheviking
Tags: users, authors
Requires at least: 3.4
Tested up to: 3.5.1
Stable tag: 1.2.1
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

= Parameters =

Simple User Listing uses `WP_User_Query`, so you can pass it a role defining which type of users you'd like to list.  You can also adjust the number of users displayed per page.

`
[userlist role="author" number="5"]
`

As of version 1.2 you can now sort the user list by and of the sort parameters supported by `WP_User_Query()`.  For example, the following would list your users based on number of posts written, with the highest first.

`
[userlist orderby="post_count" order="DESC"]
`

= Templates =

The whole reason I wrote this was that other similar plugins had too much control over the output.  You can style the output anyway you'd like by adding your own template parts to your theme.  Though you can copy the individual templates into your theme's main directory, probably the easiest thing to do would be to copy the entire `/templates` folder from the plugin and paste it into your theme, renaming the folder to `simple_user_listing`.  Now you can style away as you wish.  It will be similar to template parts for loops, except you will have access to each user's $user object instead of the $post object.

[See the Codex reference on WP_User_Query](http://codex.wordpress.org/Class_Reference/WP_User_Query)

== Installation ==

1. Upload the `plugin` folder to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress
1. Add the shortcode [userlist] anywhere you wish to display a list of users

== Bug Reporting ==

Please report any issues at: https://github.com/helgatheviking/Featured-Item-Metabox/issues

== Changelog ==

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