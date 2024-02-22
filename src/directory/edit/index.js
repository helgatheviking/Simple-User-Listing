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
 * Inspector Controls appear in the post settings sidebar when a block is being edited.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#inspectorcontrols
 */
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Core components
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody
 */
import { PanelBody, RangeControl, TextControl } from '@wordpress/components';

/**
 * Similar string cleanup function to WordPress's `sanitize_title`.
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-url/#cleanforslug
 */
import { cleanForSlug } from '@wordpress/url';

/**
 * Local dependencies
 */
import SearchForm from "./search-form";
import User from "./user";

/**
 * Block controls for the User Query.
 *
 * @return {WPElement} Element to render.
 */
const QueryInspectorControls = ( { attributes, setAttributes } ) => {

    const { queryId } = attributes;

	return (
        <InspectorControls>
            <PanelBody title={__('User Query Settings', 'simple-user-listing')}>
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
const LayoutInspectorControls = ( { attributes, setAttributes } ) => {

    const { usersPerPage, className = '', columns } = attributes;
    const isGrid = className.includes('is-style-grid');

	return (
        <InspectorControls>
            <PanelBody title={ __( 'Layout', 'simple-user-listing' ) }>
                <RangeControl
                    label={__('Users per page', 'simple-user-listing')}
                    value={ usersPerPage }
                    onChange={ ( value ) => setAttributes({ usersPerPage: value }) }
                    min={ 1 }
                    max={ 10 }
                />

                { isGrid && (
                    <RangeControl
                        label={__('Columns', 'simple-user-listing')}
                        value={ columns }
                        onChange={ ( value ) => setAttributes({ columns: value }) }
                        min={ 1 }
                        max={ 4 }
                    />
                ) }
            </PanelBody>
        </InspectorControls>

	);
}
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
    const { users, isLoaded } = useSelect( ( select ) => {
        return {
            users: select( 'core' ).getUsers(),
            isLoaded: select( 'core' ).hasFinishedResolution( 'getUsers' ),
        };
    }, [] );

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
        </>
    );
}