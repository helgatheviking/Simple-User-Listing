/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * React hook for fetching dta from the core data store.
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/#useselect
 */
import { useSelect } from '@wordpress/data';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Local dependencies
 */
import SearchForm from "./components/search-form";
import User from "./components/user";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes }) {
    const { users, isLoaded } = useSelect( ( select ) => {
        return {
            users: select( 'core' ).getUsers(),
            isLoaded: select( 'core' ).hasFinishedResolution( 'getUsers' ),
        };
    }, [] );

    return (
        return null;
    }

	return (
            <div { ...useBlockProps() }>
                <SearchForm />
                <div className="user-list-wrap">

                    { isLoaded ? (
                        users && users.length > 0 ? (
                            users.map(user => (
                                <User key={user.id} user={user} />
                            ))
                        ) : (
                            <h2>{ __( 'No users found', 'simple-user-listing' ) }</h2>
                        )
                    ) : (
                        <h2>{ __( 'Loading users...', 'simple-user-listing' ) }</h2>
                    ) }

                </div>
        </div>
	);
    );
}