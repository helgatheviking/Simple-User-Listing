/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody,
    RangeControl,
    ToggleControl,
    TextControl,
    SelectControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { cleanForSlug } from '@wordpress/url';

/**
 * Local dependencies
 */
import { OrderControls, RoleControl } from '../../controls';
import { RoleControl } from '../../controls';

/**
 * Block controls for the User Query.
 *
 * @return {WPElement} Element to render.
 */
export function QueryInspectorControls ( { attributes, setAttributes } ) {

    const { excludeRoles, order, orderBy, showAllUsers, queryId, roles, usersPerPage } = attributes;

    const resetUserFilters = () => {
        setAttributes( {
            excludeRoles: false,
            roles: '',
        } );
    };

	return (
        <InspectorControls>
            <PanelBody title={__('User Query Settings', 'simple-user-listing')}>
                <ToggleControl
                    label={__('Display all users', 'simple-user-listing')}
                    help= {__('Toggle to show all site users. Disable to limit display to certain users.', 'simple-user-listing')}
                    checked={showAllUsers}
                    onChange={() => {
                        setAttributes({ showAllUsers: !showAllUsers });
                    }}
                />

                <RangeControl
                    label={__('Users per page', 'simple-user-listing')}
                    value={ usersPerPage }
                    onChange={ ( value ) => setAttributes({ usersPerPage: value }) }
                    min={ 1 }
                    max={ 20 }
                />
  
                <OrderControls
                    order={order}
                    orderBy={orderBy}
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

            { ! showAllUsers && (
                <ToolsPanel label={ __( 'Filter Users', 'simple-user-listing' ) } resetAll={ resetUserFilters }>

                    <ToolsPanelItem
                        hasValue={ () => !! roles }
                        label={ __( 'By roles',  'simple-user-listing' ) }
                        onDeselect={ () => setAttributes( { 
                            excludeRoles: false,
                            roles: ''
                        } ) }
                    >
                        <RoleControl
                            value={ roles }
                            onChange={ ( newRoles ) => setAttributes( { roles: newRoles } ) }
                        />

                        <ToggleControl
                            label={ __(
                                'Exclude roles',
                                'simple-user-listing'
                            ) }
                            checked={ excludeRoles }
                            onChange={ () =>
                                setAttributes( { excludeRoles: ! excludeRoles } )
                            }
                        />

                    </ToolsPanelItem>
                </ToolsPanel>
            ) }  
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