import React, {Fragment, useEffect} from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {connect} from "react-redux";
import {addLike, removeLike, deletePost} from "../../actions/post";

const PostItem = ({auth, post: {_id, text, name, avatar, user, likes, comments, date}, addLike, removeLike, deletePost, showActions}) => {
    return (
        <Fragment>
            <div class="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                    <img
                        class="round-img"
                        src={avatar}
                        alt=""
                    />
                    <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p class="my-1">
                    {text}
                    </p>
                    <p class="post-date">
                        Posted on <Moment format="YYYYMMDD">{date}</Moment>
                    </p>

                    {showActions && <Fragment>
                        {/* Like Button */}
                        <button type="button" onClick={() => addLike(_id)}class="btn btn-light">
                        <i class="fas fa-thumbs-up"></i>{` `}
                        <span>{likes.length}</span>
                        </button>

                        {/* Unlike button */}
                        <button type="button" onClick={() => removeLike(_id)} class="btn btn-light">
                        <i class="fas fa-thumbs-down"></i>
                        </button>

                        {/* Comment/Discussion */}
                        <Link to={`/posts/${_id}`} class="btn btn-primary">
                        Discussion {` `}<span class='comment-count'>{comments.length}</span>
                        </Link>
                        
                        {/* Delete Post */}
                        {!auth.loading && user === auth.user._id && (
                            <button onClick={() => deletePost(_id)} type="button" class="btn btn-danger">
                            <i class="fas fa-times"></i>
                            </button>
                        )}
                    </Fragment>}
                    
                </div>
            </div>
        </Fragment>
    )
}

PostItem.defaultProps = {
    showActions:true 
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addLike: (postId) => dispatch(addLike(postId)),
        removeLike: (postId) => dispatch(removeLike(postId)),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);