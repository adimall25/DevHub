import axios from "axios";
import {setAlert} from "./alert.js";

import {
    GET_PROFILE, 
    PROFILE_ERROR, 
    PROFILE_LOADED,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILES,
    PROFILES_LOADED,
    GET_GITHUB_REPOS,
    GITHUB_REPOS_LOADED
} from "./types.js";

//Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
    try{
        dispatch({
            type:GET_PROFILE
        });

        const res = await axios.get('/api/profile/me');

        dispatch({
            type:PROFILE_LOADED,
            payload: res.data
        });
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Get all profiles
export const getProfiles = () => async (dispatch) => {
    try{
        dispatch({
            type:GET_PROFILES
        });

        const res = await axios.get('/api/profile/');

        dispatch({
            type:PROFILES_LOADED,
            payload: res.data
        });
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
    try{
        dispatch({
            type:GET_PROFILE
        });

        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type:PROFILE_LOADED,
            payload: res.data
        });

        // console.log(res.data);
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Get github repos
export const getGithubRepos = (username) => async (dispatch) => {
    try{
        dispatch({
            type:GET_GITHUB_REPOS
        });
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type:GITHUB_REPOS_LOADED,
            payload: res.data
        });
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Create profile
export const createProfile = (formData, history) => async dispatch => {
    try{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });

        dispatch(setAlert('Profile Created Successfully', "success")); 

        history.push('/dashboard');
        
    }
    catch(err){
        console.log("err");
        const errors = err?.response?.data?.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        } 
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

// update profile
export const updateProfile = (formData, history) => async dispatch => {
    try{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('/api/profile', formData, config);


        dispatch({
            type:CLEAR_PROFILE
        })

        
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });

        

        dispatch(setAlert('Profile Updated Successfully', "success")); 
        history.push('/dashboard');
        
    }
    catch(err){
        // console.log("err");
        const errors = err?.response?.data?.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        } 
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}


//Add experience
export const addExperience = (formData, history) => async (dispatch) => {
    try{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert('Experience Added', "success")); 

        history.push("/dashboard");
    }
    catch(err){
        console.log("err");
        const errors = err?.response?.data?.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        } 
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err?.response?.statusText, status: err?.response?.status}
        });
    }
}

//Add education
export const addEducation = (formData, history) => async (dispatch) => {
    try{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert('Education Added', "success")); 

        history.push("/dashboard");
    }
    catch(err){
        console.log("err");
        const errors = err?.response?.data?.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        } 
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}


//Delete experience
export const deleteExperience = id => async (dispatch) => {
    try{
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}    
        })
    }
}


//Delete education
export const deleteEducation = id => async (dispatch) => {
    try{
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}    
        })
    }
}


//Delete Account and Profile
export const deleteAccount = () => async (dispatch) => {
    if(window.confirm('Are you sure? This can NOT be undone!')){
        try{
            const res = await axios.delete(`/api/profile/`);
    
            dispatch({
                type:CLEAR_PROFILE
            })

            dispatch({
                type:ACCOUNT_DELETED
            })

            dispatch(setAlert('Your account has been permanently deleted', 'success'));
        }
        catch(err){
            dispatch({
                type:PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}    
            })
        }
    }
    
}