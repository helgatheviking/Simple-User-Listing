import {Component} from '@wordpress/element';

class SearchForm extends Component {
    render() {
        return (
            <div className="author-search">
                <h2>Search authors by name</h2>
                <form method="get" id="sul-searchform" action="">
                    <label htmlFor="as" className="assistive-text">Search</label>
                    <input type="text" className="field" name="as" id="sul-s" placeholder="Search Authors" value=""/>
                    <input type="submit" className="submit" id="sul-searchsubmit" value="Search Authors"/>
                </form>
            </div>
        )
    }
}

export default SearchForm;