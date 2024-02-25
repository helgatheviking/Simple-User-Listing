/**
 * Decodes the HTML entities from a given string.
 * 
 * @see: https://developer.wordpress.org/block-editor/reference-guides/packages/packages-html-entities/#decodeentities
 */
import { decodeEntities } from '@wordpress/html-entities';

const User = ( {user} ) => {
    return (
        <div id="user-1" className="author-block">
            <img alt=""
                    src={ user.avatar_urls[96] }
                    srcSet={`${user.avatar_urls[96]} 2x`}
                    className="avatar avatar-90 photo" loading="lazy" width="90" height="90"/>
            <h2 className="author-name">{user.name}</h2>
            { user.description && (
                <p className="author-description">{ decodeEntities( user.description ) }</p>
            ) }
        </div>
    )
}

export default User;
