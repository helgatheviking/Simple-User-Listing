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
 * Block controls for the User Query.
 *
 * @return {WPElement} Element to render.
 */
export function QueryInspectorControls ( props ) {

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

/**
 * Layout related inspector controls.
 *
 * @return {WPElement} Element to render.
 */
export function LayoutInspectorControls( props ) {

    const { attributes, setAttributes } = props;

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