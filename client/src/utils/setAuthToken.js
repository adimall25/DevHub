import axios from "axios";

export const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
        // console.log("YES");
    }
    else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}