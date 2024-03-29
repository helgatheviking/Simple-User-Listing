/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { dispatch } from '@wordpress/data';
import { useEntityRecords } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';

/**
 * Local dependencies
 */
import './filters';
import { LayoutPanel, QueryPanel } from './inspector-controls';
import { SearchForm, User } from "../components";

/**
 * Add our custom entities for retrieving external data in the Block Editor.
 */
dispatch( 'core' ).addEntities( [
	{
		baseURL: '/simple-user-listing/v1/user-roles',
        label: __( 'User Roles', 'simple-user-listing' ),
		kind: 'simple-user-listing/v1',
		name: 'user-roles',
	}
] );

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

    const { excludeRoles, excludeUsers, order, orderBy, showAllUsers, roles, users, usersPerPage } = attributes;

    let queryParams = {
        orderby : orderBy,
        order   : order,
        per_page: usersPerPage,
    };

    // Set up custom user query parameters.
    if ( ! showAllUsers ) {
        if ( !! roles ) {
            if ( excludeRoles ) {
                queryParams.roles__not_in = roles;
            } else {
                queryParams.roles = roles;
            }
        }
        if ( !! users ) {
            if ( excludeUsers ) {
                queryParams.exclude = users;
            } else {
                queryParams.include = users;
            }
        }
    }
    
    const { records, hasResolved } = useEntityRecords( "root", "user", queryParams );

    return (
        <>

            <InspectorControls>
                <QueryPanel
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                />
                
                <LayoutPanel
                    attributes={ attributes }
                    setAttributes={ setAttributes }
                />
            </InspectorControls>
            
            <div { ...useBlockProps() }>
                <SearchForm />
                <div className="user-list-wrap">

                    { ! hasResolved ? (
                        <Spinner/>
                    ) : (
                        records && records.length > 0 ? (
                            records.map(user => (
                                <User key={user.id} user={user} />
                            ))
                        ) : (
                            <h2>{ __( 'No users found', 'simple-user-listing' ) }</h2>
                        ) 
                    ) }

                </div>
            </div>
        </>
    );
}