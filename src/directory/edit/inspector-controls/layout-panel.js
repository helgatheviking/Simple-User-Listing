/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
    PanelBody,
    RangeControl,
} from '@wordpress/components';


/**
 * Layout related inspector controls.
 *
 * @return {WPElement} Element to render.
 */
export default function LayoutPanel( props ) {

    const { attributes, setAttributes } = props;

    const { className = '', columns } = attributes;
    const isGrid = className.includes('is-style-grid');

    if ( !isGrid ) {
        return null;
    }

	return (
        <PanelBody title={ __( 'Layout', 'simple-user-listing' ) }>
            <RangeControl
                label={__('Columns', 'simple-user-listing')}
                value={ columns }
                onChange={ ( value ) => setAttributes({ columns: value }) }
                min={ 1 }
                max={ 4 }
            />                    
        </PanelBody>
	);
}