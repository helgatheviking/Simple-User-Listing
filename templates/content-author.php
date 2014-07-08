<?php
/**
 * The Template for displaying Author listings
 *
 * Override this template by copying it to yourtheme/authors/content-author.php
 *
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $user;

$user_info = get_userdata( $user->ID );
$num_posts = count_user_posts( $user->ID );
?>
<div id="user-<?php echo $user->ID; ?>" class="author-block">
	<?php echo get_avatar( $user->ID, 90 ); ?>

	<h2>
		<?php if ( $num_posts > 0 ) { 

			printf( '<a href="%s" title="%s">%s</a> <span class="post-count"><span class="hyphen">-</span> %s</span>', 

				get_author_posts_url( $user->ID ),
				sprintf( esc_attr__( 'Read posts by %s', 'simple-user-listing' ), $user_info->display_name ),
				$user_info->display_name,
				sprintf( _nx( '1 post', '%s posts', $num_posts, 'number of posts', 'simple-user-listing' ), $num_posts )

			);

		?>	
	<?php } else {
			echo $user_info->display_name;
		} ?>
	</h2>

	<p><?php echo $user_info->description; ?></p>

</div>