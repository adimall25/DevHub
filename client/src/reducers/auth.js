import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED} from "../actions/types.js";

const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user:null
}

export default function(state = initialState, action){
    switch(action.type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {...state, ...action.payload, loading:false}
        
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {...state, token:null, isAuthenticated: false, loading:false};
        
        case USER_LOADED:
            return {...state, isAuthenticated:true, loading:false, user: action.payload} 
        
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {...state, isAuthenticated:false, loading:false, user:null, token:null};
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {...state, isAuthenticated:false, user:null, loading: false, token:null};
        default:
            return {...state};
    }
}