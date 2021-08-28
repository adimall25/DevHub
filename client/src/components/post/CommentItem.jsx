import React, {Fragment} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {deleteComment} from "../../actions/post";



const CommentItem = ({
    postId, 
    comment : {
        _id, text, name, avatar, user, date
    },
    auth,
    deleteComment
}) => {
    return (
        <Fragment>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img
                            class="round-img"
                            src={avatar}
                            alt=""
                        />
                    </Link>
                    
                    <h4>{name}</h4>
                </div>
                <div>
                    <p className="my-1">
                    {text}
                    </p>
                    <p className="post-date">
                        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
                    </p>
                    {!auth.loading && user === auth.user._id && (
                        <button onClick={e => {
                            e.preventDefault();
                            deleteComment(postId, _id);
                        }} type="button" className="btn btn-danger">
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment : (postId, commentId) => dispatch(deleteComment(postId, commentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);