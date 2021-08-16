import axios from "axios";
import {setAlert} from "./alert";

import {
    GET_POSTS,
    POSTS_LOADED,
    POST_ERROR,
    UPDATE_LIKES,
    ADD_LIKE,
    REMOVE_LIKE,
    DELETE_POST,
    POST_DELETED,
    ADD_POST,
    POST_ADDED,
    GET_POST,
    POST_LOADED,
    ADD_COMMENT,
    COMMENT_ADDED,
    REMOVE_COMMENT,
    COMMENT_REMOVED
} from "./types";


//Get Posts
export const getPosts = () => async dispatch => {
    try{
        dispatch({type:GET_POSTS});
        const res = await axios.get("/api/posts");
        dispatch({
            type:POSTS_LOADED,
            payload:res.data
        })
        
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Get a single post
export const getPost = (postId) => async dispatch => {
    try{
        dispatch({type:GET_POST});
        const res = await axios.get(`/api/posts/${postId}`);
        dispatch({
            type:POST_LOADED,
            payload:res.data
        })
        
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Delete Post
export const deletePost = (postId) => async dispatch => {
    try{
        dispatch({type:DELETE_POST});
        const res = await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type:POST_DELETED,
            payload:{postId}
        })

    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Add Post
export const addPost = (formData) => async dispatch => {
    try{
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        dispatch({type:ADD_POST});

        const res = await axios.post(`api/posts/`, formData, config);

        dispatch({
            type:POST_ADDED,
            payload:res.data
        })

    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Add Comment
export const addComment = (postId,formData) => async dispatch => {
    try{
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        dispatch({type:ADD_COMMENT});

        const res = await axios.post(`/api/posts/comments/${postId}`, formData, config);

        dispatch({
            type:COMMENT_ADDED,
            payload:res.data
        })

        dispatch(setAlert("Comment Added", "success"));
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Remove Comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try{
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        dispatch({type:REMOVE_COMMENT});

        const res = await axios.delete(`/api/posts/comments/${postId}/${commentId}`);

        dispatch({
            type:COMMENT_REMOVED,
            payload:commentId
        })

        dispatch(setAlert("Comment Deleted", "success"));
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
    }
}


//Add like
export const addLike = (postId) => async dispatch => {
    try{
        dispatch({type:ADD_LIKE});
        const res = await axios.put(`api/posts/like/${postId}`);
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId, likes: res.data}
        })

    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
    }
}


//Remove like
export const removeLike = (postId) => async dispatch => {
    try{
        dispatch({type:REMOVE_LIKE});
        const res = await axios.put(`api/posts/unlike/${postId}`);
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId, likes: res.data}
        })

    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
    }
}