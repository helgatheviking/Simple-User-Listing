<?php
/**
 * The Template for displaying Author listings
 *
 * Override this template by copying it to yourtheme/authors/navigation-author.php
 *
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $user;

$user_info = get_userdata($user->ID);
$num_posts = count_user_posts ( $user->ID );
?>
<div id="user-<?php echo $user->ID; ?>" class="author-block">
	<p><?php echo $user_info->first_name . ' ' . $user_info->last_name; ?></p>

</div>
