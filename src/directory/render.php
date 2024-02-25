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

// Sort users by ordersby parameter.
if ( ! empty( $attributes['orderBy'] ) ) {
    $args['orderby'] = $attributes['orderBy'];
}

// Order users.
if ( ! empty( $attributes['order'] ) ) {
    $args['order'] = $attributes['order'];
}

// Limit users per page.
if ( ! empty( $attributes['usersPerPage'] ) ) {
    $args['number'] = $attributes['usersPerPage'];
}

// Custom query ID for advanced filtering.
if ( ! empty( $attributes['queryId'] ) ) {
    $args['query_id'] = $attributes['queryId'];
}

// If not showing all users, build a custom query
if ( empty( $attributes['showAllUsers'] ) ) {

    // Build a query.
    if ( ! empty( $attributes['roles'] ) ) {
        if ( ! empty( $attributes['excludeRoles'] ) ) {
            $args['role__not_in'] = $attributes['roles'];
        } else {
            $args['role__in'] = $attributes['roles'];
        }
    }
    if ( ! empty( $attributes['users'] ) ) {
        if ( ! empty( $attributes['excludeUsers'] ) ) {
            $args['exclude'] = $attributes['users'];
        } else {
            $args['include'] = $attributes['users'];
        }
    }
}

?>

    <?php echo Simple_User_Listing::get_instance()->shortcode_callback( $args ); ?>
</div>