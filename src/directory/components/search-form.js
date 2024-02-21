/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const SearchForm = () => {
    return (
        <div className="author-search">
            <h2>{ __( 'Search authors by name', 'simple-user-listing' ) }</h2>
            <form method="get" action="">
                <label htmlFor="as" className="assistive-text">{ __( 'Search', 'simple-user-listing' ) }</label>
                <input type="text" className="field" name="as" placeholder={ __( 'Search Authors', 'simple-user-listing' ) } readOnly />
                <input type="submit" className="button button-primary" value={ __( 'Search Authors', 'simple-user-listing' ) } readOnly />
            </form>
        </div>
    )
}

export default SearchForm;