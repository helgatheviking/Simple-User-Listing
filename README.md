Simple-User-Listing
===================

## Description

A shortcode for displaying lists of users in a simple, easy-to-customize (uses template parts) fashion

## Installation

1. Upload the `plugin` folder to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress

## Usage

To show all users.  By default the plugin will split the users up based on the "Posts per Page" setting under Settings->Reading.

`
[userlist]
`

###With Parameters

Simple User Listing uses `WP_User_Query`, so you can pass it a role defining which type of users you'd like to list.  You can also adjust the number of users displayed per page.

`
[userlist role="author" number="5"]
`

