/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
    PanelBody,
    RangeControl,
    SelectControl,
    ToggleControl,
    TextControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { cleanForSlug } from '@wordpress/url';

/**
 * Local dependencies
 */
import { RoleControl, UserControl } from '../../controls';
import { orderByOptions, orderOptions } from './constants';

/**
 * Block controls for the User Query.
 *
 * @return {WPElement} Element to render.
 */
export default function QueryPanel ( { attributes, setAttributes } ) {

    const { excludeRoles, excludeUsers, order, orderBy, showAllUsers, queryId, roles, users, usersPerPage } = attributes;

    const resetUserFilters = () => {
        setAttributes( {
            excludeRoles: false,
            excludeUsers: false,
            roles: '',
            users: '',
        } );
    };

	return (
        <>
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
  
                <SelectControl
                    __nextHasNoMarginBottom
                    label={ __( 'Order by', 'simple-user-listing' ) }
                    value={ orderBy }
                    options={ orderByOptions }
                    onChange={ ( value ) => {
                        setAttributes( { orderBy: value } );
                    } }
                />

                <SelectControl
                    __nextHasNoMarginBottom
                    label={ __( 'Order', 'simple-user-listing' ) }
                    value={ order }
                    options={ orderOptions }
                    onChange={ ( value ) => {
                        setAttributes( { order: value } );
                    } }
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
                    <ToolsPanelItem
                        hasValue={ () => !! users }
                        label={ __( 'By user', 'simple-user-listing' ) }
                        onDeselect={ () => setAttributes( { 
                            excludeUsers: false,
                            users: ''
                        } ) }
                    >

                        <UserControl
                            value={ users }
                            onChange={ ( newUsers ) => setAttributes( { users: newUsers } ) }
                        />

                        <ToggleControl
                            label={ __(
                                'Exclude users',
                                'simple-user-listing'
                            ) }
                            checked={ excludeUsers }
                            onChange={ () =>
                                setAttributes( { excludeUsers: ! excludeUsers } )
                            }
                        />

                    </ToolsPanelItem>
                </ToolsPanel>
            ) }  
        </>

	);
}
