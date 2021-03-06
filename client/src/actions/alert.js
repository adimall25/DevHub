import {SET_ALERT, REMOVE_ALERT} from "./types.js";
import {v4 as uuid} from 'uuid';

export const setAlert = (msg, alertType) => {
    return (dispatch) => {
        const id = uuid();
        // console.log(id);
        dispatch({
            type:SET_ALERT,
            payload:{
                id,
                msg,
                alertType 
            }
        })

        setTimeout(() => {
            dispatch({
                type:REMOVE_ALERT,
                payload:id
            })
        }, 3000)
    }
}
