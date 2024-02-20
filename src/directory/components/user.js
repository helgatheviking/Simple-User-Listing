const User = ( {user} ) => {
    return (
        <div id="user-1" className="author-block">
            <img alt=""
                    src={ user.avatar_urls[96] }
                    srcSet={`${user.avatar_urls[96]} 2x`}
                    className="avatar avatar-90 photo" loading="lazy" width="90" height="90"/>
            <h2>{user.name}</h2>
            { user.description && ( 
                <p>{user.description}</p>
            ) }
        </div>
    )
}

export default User;
