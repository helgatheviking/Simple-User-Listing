/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody,
    RangeControl,
    TextControl,
} from '@wordpress/components';

import { cleanForSlug } from '@wordpress/url';

/**
 * Local dependencies
 */
import OrderControls from './order-controls';

/**
 * Block controls for the User Query.
 *
 * @return {WPElement} Element to render.
 */
export function QueryInspectorControls ( { attributes, setAttributes } ) {

    const { order, orderBy, queryId, usersPerPage } = attributes;

	return (
        <InspectorControls>
            <PanelBody title={__('User Query Settings', 'simple-user-listing')}>

                <RangeControl
                    label={__('Users per page', 'simple-user-listing')}
                    value={ usersPerPage }
                    onChange={ ( value ) => setAttributes({ usersPerPage: value }) }
                    min={ 1 }
                    max={ 20 }
                />
  
                <OrderControls
                    { ...{ order, orderBy } }
                    onOrderByChange={ ( newOrderBy ) => setAttributes( { orderBy: newOrderBy } ) }
                    onOrderChange={ ( newOrder ) => setAttributes( { order: newOrder } ) }
                />

                <TextControl
                    label={ __(
                        'Query ID',
                        'simple-user-listing'
                    ) }
                    help={ __(
                        'Custom `query_id` for advanced usage.',
                        'simple-user-listing'
                    ) }
                    value={ queryId || '' }
                    onChange={ ( value ) => {
                        let cleanValue = cleanForSlug( value );
                        setAttributes( { queryId: cleanValue } )
                    } }
                />
            </PanelBody>
        </InspectorControls>

	);
}

/**
 * Layout related inspector controls.
 *
 * @return {WPElement} Element to render.
 */
export function LayoutInspectorControls( props ) {

    const { attributes, setAttributes } = props;

    const { className = '', columns } = attributes;
    const isGrid = className.includes('is-style-grid');

    if ( !isGrid ) {
        return null;
    }

	return (
            <InspectorControls>
                <PanelBody title={ __( 'Layout', 'simple-user-listing' ) }>
                    <RangeControl
                        label={__('Columns', 'simple-user-listing')}
                        value={ columns }
                        onChange={ ( value ) => setAttributes({ columns: value }) }
                        min={ 1 }
                        max={ 4 }
                    />                    
                </PanelBody>
            </InspectorControls>
	);
}