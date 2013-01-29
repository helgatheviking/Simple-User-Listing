<?php
/**
 * The Template for displaying No Results
 *
 * Override this template by copying it to yourtheme/authors/navigation-author.php
 *
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $author; 

$author_info = get_userdata($author->ID);
?>
<div class="author-block">
	<?php echo get_avatar( $author->ID, 90 ); ?> 
	<h2><a href="<?php echo get_author_posts_url($author->ID); ?>"><?php echo $author_info->display_name; ?></a> - <?php printf( __( '%s posts', 'simple-user-listing'), count_user_posts( $author->ID ) ); ?></h2>
	<p><?php echo $author_info->description; ?></p>

	<p><a href="<?php echo get_author_posts_url($author->ID); ?> ">Read <?php echo $author_info->display_name; ?> posts</a></p>
</div>
