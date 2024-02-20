<?php
/**
 * Render the user list.
 *
 * @since 2.0.0
 */
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
    <?php echo Simple_User_Listing::get_instance()->shortcode_callback();  ?>
</div>