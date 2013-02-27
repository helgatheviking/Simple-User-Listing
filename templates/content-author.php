<?php
/**
 * The Template for displaying No Results
 *
 * Override this template by copying it to yourtheme/authors/navigation-author.php
 *
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $user;

$user_info = get_userdata($user->ID);
?>
<div id="user-<?php echo $user->ID; ?>" class="author-block">
	<?php echo get_avatar( $user->ID, 90 ); ?>
	<h2><a href="<?php echo get_author_posts_url($user->ID); ?>"><?php echo $user_info->display_name; ?></a> - <?php printf( __( '%s posts', 'simple-user-listing'), count_user_posts( $user->ID ) ); ?></h2>
	<p><?php echo $user_info->description; ?></p>

	<p><a href="<?php echo get_author_posts_url($user->ID); ?> ">Read <?php echo $user_info->display_name; ?> posts</a></p>
</div>
