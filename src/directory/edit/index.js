/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { dispatch } from '@wordpress/data';
import { useEntityRecords } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';

/**
 * Local dependencies
 */
import './filters';
import { LayoutInspectorControls, QueryInspectorControls } from './inspector-controls';
import SearchForm from "./search-form";
import User from "./user";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

    const { order, orderBy, usersPerPage } = attributes;

    const queryParams = {
        orderby : orderBy,
        order   : order,
        per_page: usersPerPage,
    };
    
    const { records, hasResolved } = useEntityRecords( "root", "user", queryParams );

    return (
        <>
            <QueryInspectorControls
                attributes={ attributes }
                setAttributes={ setAttributes }
            />
            <LayoutInspectorControls
                attributes={ attributes }
                setAttributes={ setAttributes }
            />

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