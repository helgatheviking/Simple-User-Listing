import { registerBlockType } from '@wordpress/blocks';

import Edit from "./edit";
import Save from "./save";

registerBlockType( 'myguten/test-block', {
    title: 'Basic Example',
    icon: 'smiley',
    category: 'design',
    edit: Edit,
    save: Save,
} );