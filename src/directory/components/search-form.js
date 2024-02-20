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
                <input type="text" className="field" name="as" placeholder={ __( 'Search Authors', 'simple-user-listing' ) } value=""/>
                <input type="submit" className="submit" id="sul-searchsubmit" value={ __( 'Search Authors', 'simple-user-listing' ) } />
            </form>
        </div>
    )
}

export default SearchForm;