<?php
/**
 * The Template for displaying Author listings
 *
 * Override this template by copying it to yourtheme/simple-user-listing/content-author.php
 *
 * @author 		helgatheviking
 * @package 	Simple-User-Listing/Templates
 * @version     1.9.0
 *
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $user;

?>
<div id="user-<?php echo esc_attr( $user->ID ); ?>" class="author-block">

	<?php
	/**
	 * Hook: sul_before_user_loop_author.
	 *
	 * @hooked sul_template_loop_author_link_open - 10
	 */
	do_action( 'sul_before_user_loop_author', $user );

	/**
	 * Hook: sul_before_user_loop_author_title.
	 *
	 * @hooked sul_template_loop_author_avatar - 10
	 */
	do_action( 'sul_before_user_loop_author_title', $user );

	/**
	 * Hook: sul_user_loop_author_title.
	 *
	 * @hooked sul_template_loop_author_name - 10
	 */
	do_action( 'sul_user_loop_author_title', $user );

	/**
	 * Hook: sul_after_user_loop_author_title.
	 */
	do_action( 'sul_after_user_loop_author_title', $user );

	/**
	 * Hook: sul_after_user_loop_author.
	 *
	 * @hooked sul_template_loop_author_link_close - 5
	 * @hooked sul_template_loop_author_description - 10
	 */
	do_action( 'sul_after_user_loop_author', $user );

	?>

</div>
