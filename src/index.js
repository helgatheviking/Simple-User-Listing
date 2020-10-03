import { registerBlockType } from '@wordpress/blocks';

console.log('Loaded')

import Edit from "./edit";

registerBlockType( 'simple-user-listing/userlist-block', {
    title: 'Simple User Listing',
    icon: 'smiley',
    category: 'design',
    edit: Edit,
} );