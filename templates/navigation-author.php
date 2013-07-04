<?php
/**
 * The Template for displaying User page navigation
 *
 * Override this template by copying it to yourtheme/simple-user-listing/navigation-author.php
 *
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $sul_users;

// Get Query Var for pagination. This already exists in WordPress
$page = (get_query_var('paged')) ? get_query_var('paged') : 1;

// Get the total number of authors. Based on this, offset and number
// per page, we'll generate our pagination.
$total_authors = $sul_users->get_total();

// authors per page from query
$number = intval ( $sul_users->query_vars['number'] ) ? intval ( $sul_users->query_vars['number'] ) : 1;

// Calculate the total number of pages for the pagination (use ceil() to always round up)
$total_pages = ceil($total_authors / $number);

// Only show the navigation if needed
if ( $total_pages > 1 ) :
?>

<nav id="nav-single">
	<h3 class="assistive-text"><?php _e('User navigation', 'simple-user-listing');?></h3>
	<?php if ($page != 1) { ?>
		<span class="nav-previous"><a rel="prev" href="<?php the_permalink() ?>page/<?php echo $page - 1; ?>/"><span class="meta-nav">&larr;</span> <?php _e('Previous', 'simple-user-listing');?></a></span>
	<?php } ?>

	<?php if ($page < $total_pages ) { ?>
		<span class="nav-next"><a rel="next" href="<?php the_permalink() ?>page/<?php echo $page + 1; ?>/"><?php _e('Next', 'simple-user-listing');?> <span class="meta-nav">&rarr;</span></a></span>
	<?php } ?>
</nav>

<?php endif; ?>