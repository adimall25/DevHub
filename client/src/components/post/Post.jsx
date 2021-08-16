import React, {useState, useEffect, Fragment} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";

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