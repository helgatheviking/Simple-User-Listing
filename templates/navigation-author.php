<?php
/**
 * The Template for displaying User page navigation
 *
 * Override this template by copying it to yourtheme/simple-user-listing/navigation-author.php
 *
 * @author 		helgatheviking
 * @package 	Simple-User-Listing/Templates
 * @version     1.8.4
 *
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

global $simple_user_listing, $sul_users;

if( function_exists( 'wp_pagenavi' ) ):

	wp_pagenavi(
		array( 'query' => $sul_users,
				'type' => 'users' )
	);

// Only show the navigation if needed.
elseif ( Simple_User_Listing::get_instance()->get_total_user_pages() > 1 ) : ?>

	<nav id="nav-single">

		<h3 class="assistive-text"><?php _e( 'User navigation', 'simple-user-listing' );?></h3>

		<?php

		if ( $previous_url = Simple_User_Listing::get_instance()->get_previous_users_url() ) : ?>
			<span class="nav-previous"><a rel="prev" href="<?php echo esc_url( $previous_url ); ?>"><?php _e( '<span class="meta-nav">&larr;</span> Previous', 'simple-user-listing');?></a></span>
		<?php endif; ?>

		<?php if ( $next_url = Simple_User_Listing::get_instance()->get_next_users_url() ) : ?>
			<span class="nav-next"><a rel="next" href="<?php echo esc_url( $next_url ); ?>"><?php _e( 'Next <span class="meta-nav">&rarr;</span>', 'simple-user-listing' );?></a></span>
		<?php endif; ?>

	</nav>

<?php endif; ?>
