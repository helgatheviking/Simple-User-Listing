/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * React hook for fetching data from the core data store.
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/#useentityrecords
 */
import { useEntityRecords } from '@wordpress/core-data';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Default spinner component
 */
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

    const { usersPerPage } = attributes;

    const queryParams = {
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