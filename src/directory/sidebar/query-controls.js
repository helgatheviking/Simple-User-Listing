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
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Similar string cleanup function to WordPress's `sanitize_title`.
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-url/#cleanforslug
 */
import { cleanForSlug } from '@wordpress/url';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function QueryControls( props ) {

    const { attributes, setAttributes } = props;

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