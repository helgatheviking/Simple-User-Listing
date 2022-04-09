<?php 

/**
 * Simple User Listing Core Hooks. 
 * 
 * @package     Simple User Listing/Functions/Templates
 * @author      Kathy Darling
 * @copyright   Copyright (c) 2020, Kathy Darling
 * @license     http://opensource.org/licenses/gpl-3.0.php GNU Public License  
 */

add_filter( 'body_class',                        'sul_body_class' );

add_action( 'simple_user_listing_before_loop',   'sul_template_user_search' );
add_action( 'simple_user_listing_before_loop',   'sul_template_user_loop_wrapper_open', 20 );
add_action( 'simple_user_listing_loop',          'sul_template_user_loop', 10, 3 );
add_action( 'simple_user_listing_after_loop',    'sul_template_user_loop_wrapper_close', 5 );
add_action( 'simple_user_listing_after_loop',    'sul_template_user_navigation' );

add_action( 'sul_before_user_loop_author',       'sul_template_loop_author_link_open' );
add_action( 'sul_before_user_loop_author_title', 'sul_template_loop_author_avatar' );
add_action( 'sul_user_loop_author_title',        'sul_template_loop_author_name' );
add_action( 'sul_user_loop_author_title',        'sul_template_loop_author_link_close', 5 );
add_action( 'sul_after_user_loop_author',        'sul_template_loop_author_description' );
add_action( 'sul_after_user_loop_author',        'sul_template_loop_author_company', 20 );
