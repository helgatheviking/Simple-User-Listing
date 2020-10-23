import {Component} from '@wordpress/element';

class User extends Component {
    render() {
        return (
            <div id="user-1" className="author-block">
                <img alt=""
                     src="http://1.gravatar.com/avatar/4fd3f3bbf5f32f9e4738a00d58bdbc57?s=90&amp;d=mm&amp;r=g"
                     srcSet="http://1.gravatar.com/avatar/4fd3f3bbf5f32f9e4738a00d58bdbc57?s=180&amp;d=mm&amp;r=g 2x"
                     className="avatar avatar-90 photo" loading="lazy" width="90" height="90"/>
                <h2>admin</h2>
            </div>
        )
    }
}

export default User;