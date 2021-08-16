import React, {Fragment, useEffect} from "react";
import {connect} from "react-redux";
import {getPosts} from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostForm from "./PostForm";
import PostItem from "./PostItem.jsx";

const Posts = ({getPosts, post: {loading, posts}}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts])

    return (
        <Fragment>
            {loading ? <Spinner></Spinner> : <Fragment>
                
                {/* Heading */}
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Welcome to the community
                </p>

                {/* Post form */}
                <PostForm />

                {/* Display All Posts */}
                <div className="posts">
                    {posts.map(post => (
                        <PostItem key={post._id} post={post}/>
                    ))}
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
        getPosts : () => dispatch(getPosts())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Posts);