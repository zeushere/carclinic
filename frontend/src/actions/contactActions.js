import Axios from "axios";
import {
    EMAIL_CONTACT_SEND_FAIL,
    EMAIL_CONTACT_SEND_REQUEST,
    EMAIL_CONTACT_SEND_SUCCESS
} from "../constants/contactConstants";

export const sendContactMessage = (name, email, message) => async (dispatch) => {
    dispatch({type: EMAIL_CONTACT_SEND_REQUEST, payload: email});
    try {
        await Axios.post(`/contact`, {
                name,
                email,
                message
            }, {}
        );
        dispatch({type: EMAIL_CONTACT_SEND_SUCCESS});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: EMAIL_CONTACT_SEND_FAIL, payload: message});
    }
};