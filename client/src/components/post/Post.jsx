import React, {useState, useEffect, Fragment} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({getPost, post: {post, loading}, match}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost])
    return (
        <Fragment>
            {loading || post === null ? <Spinner></Spinner> : <Fragment>
                <Link to="/posts" className="btn">Back To Posts</Link>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id}/> 
                <div className="comments">
                    {post.comments.map(comment => {
                        return <CommentItem key={comment._id} comment={comment} postId={post._id} ></CommentItem>
                    })}
                </div>
            </Fragment>}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (postId) => dispatch(getPost(postId)) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Post);