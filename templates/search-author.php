<?php
/**
 * The Template for displaying Author Search
 *
 * Override this template by copying it to yourtheme/simple-user-listing/search-author.php
 *
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
?>

<div class="author-search">
	<h2><?php _e('Search authors by name' ,'simple-user-listing');?></h2>
		<form method="get" id="sul-searchform" action="<?php the_permalink() ?>">
			<label for="as" class="assistive-text"><?php _e('Search' ,'simple-user-listing');?></label>
			<input type="text" class="field" name="as" id="sul-s" placeholder="Search Authors" />
			<input type="submit" class="submit" name="submit" id="sul-searchsubmit" value="Search Authors" />
		</form>
	<?php 
	if($search){ ?>
		<h2 ><?php printf( __('Search Results for: %s' ,'simple-user-listing'), '<em>' . $search .'</em>' );?></h2>
		<a href="<?php the_permalink(); ?>"><?php _e('Back To Author Listing' ,'simple-user-listing');?></a>
	<?php } ?>		
</div><!-- .author-search -->