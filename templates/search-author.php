<?php
/**
 * The Template for displaying Author Search
 *
 * Override this template by copying it to yourtheme/simple-user-listing/search-author.php
 *
 * @author 		helgatheviking
 * @package 	Simple-User-Listing/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

$search = ( get_query_var( 'as' ) ) ? sanitize_text_field( get_query_var( 'as' ) ) : '';

?>

<div class="author-search">
	<h2><?php _e('Search users by name' ,'simple-user-listing');?></h2>
		<form method="get" id="sul-searchform" action="">
			<label for="sul-s" class="assistive-text"><?php _e( 'Search' ,'simple-user-listing');?></label>
			<input id="sul-s" type="text" class="field" name="as" placeholder="<?php _e( 'Search users' ,'simple-user-listing' );?>" value="<?php echo esc_attr( $search ); ?>"/>
			<input id="sul-searchsubmit" type="submit" class="button button-primary" value="<?php _e( 'Search users' ,'simple-user-listing' );?>" />
		</form>
	<?php
	if( $search ){ ?>
		<h2 ><?php printf( __('Search Results for: %s' ,'simple-user-listing'), '<em>' . esc_html( $search ) .'</em>' );?></h2>
		<a href="<?php the_permalink(); ?>"><?php _e('Back To Author Listing' ,'simple-user-listing');?></a>
	<?php } ?>
</div><!-- .author-search -->
