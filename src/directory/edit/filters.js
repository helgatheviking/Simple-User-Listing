/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

const addCustomBlockGridLayoutClass = createHigherOrderComponent( ( BlockListBlock ) => {
    return ( props ) => {
        const { name, attributes } = props;

        if ( name != 'simple-user-listing/directory-block' ) {
            return <BlockListBlock { ...props }/>;
        }
	
        const { columns, className = '' } = attributes;
        const customClass = className.includes( 'is-style-grid' ) && columns ? `columns-${columns}` : '';

        return <BlockListBlock { ...props } className={ customClass } />;
    };
}, 'addCustomBlockGridLayoutClass' );

addFilter(
	'editor.BlockListBlock',
	'simple-user-listing/grid-classes',
	addCustomBlockGridLayoutClass
);