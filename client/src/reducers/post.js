import {
    GET_POSTS,
    POSTS_LOADED,
    POST_ERROR,
    ADD_LIKE,
    REMOVE_LIKE,
    UPDATE_LIKES,
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
} from "../actions/types"

const initialState = {
    posts: [],
    post: null,
    loading:true,
    error: {}
}

export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_POSTS:
        case ADD_LIKE:
        case ADD_POST:
        case ADD_COMMENT:
        case REMOVE_LIKE:
        case DELETE_POST:
        case GET_POST:
            return {...state, loading:true};

        case POSTS_LOADED:
            return {
                ...state,
                posts:payload,
                loading:false
            }

        case POST_LOADED:
            return {
                ...state,
                loading:false,
                post:payload
            }

        case POST_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }
        
        case COMMENT_ADDED:
            return{
                ...state,
                post: {...state.post, comments: payload },
                posts: state.posts.map(post => {
                    if(post._id === state.post._id){
                        return {...post, comments: payload};
                    }
                    return post;
                }),
                loading:false
            }
        case COMMENT_REMOVED:
            return{
                ...state,
                post:{
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload)
                },
                loading:false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? {...post, likes: payload.likes}: post),
                loading:false
            }

        case POST_DELETED:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload.postId),
                loading:false
            }
        
        case POST_ADDED:
            return {
                ...state,
                loading:false,
                posts : [payload, ...state.posts]
            }
        default:
            return {...state};
    }
} 