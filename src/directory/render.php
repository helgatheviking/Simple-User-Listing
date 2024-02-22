<?php
/**
 * Dynamic Block Template: Render the user directory.
 *
 * @since 2.0.0
 * @version 2.0.0
 * @package Simple_User_Listing
 *
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 */
?>

<?php
// Add columns to the block wrapper classes.
$classes = ! empty( $attributes['className'] ) && false !== strpos( $attributes['className'], 'is-style-grid' ) ? array( 'class' => 'columns-' . $attributes['columns'] ) : array();
?>

<div <?php echo get_block_wrapper_attributes( $classes ); ?>>

<?php
$args = array();

// Limit users per page.
if ( ! empty( $attributes['usersPerPage'] ) ) {
    $args['number'] = $attributes['usersPerPage'];
}

// Custom query ID for advanced filtering.
if ( ! empty( $attributes['queryId'] ) ) {
    $args['query_id'] = $attributes['queryId'];
}
?>

    <?php echo Simple_User_Listing::get_instance()->shortcode_callback( $args ); ?>
</div>