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

	const blockProps = useBlockProps();

    const users = useSelect( ( select ) => {
        return select( 'core' ).getUsers();
    }, [] );

    if ( ! users ) {
        return null;
    }

	return (
        <div {...blockProps}>
            <SearchForm />
                <div class="user-list-wrap">

                    { users.map( ( user ) => (
                        <User key={ user.id } user={user} />
                    ) ) }
              
                </div>
        </div>
	);
}