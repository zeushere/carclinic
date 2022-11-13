import Axios from "axios";
import {
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT
} from "../constants/userConstants";

export const register = (firstName, lastName, login, email, password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {email, password}});
    try {
        await Axios.post('/register', {
                firstName,
                lastName,
                email,
                login,
                password,
            },
            {params: {'g-recaptcha': 'test'}});
        const successfulRegister = true;
        dispatch({type: USER_REGISTER_SUCCESS, payload: {successfulRegister}});
        localStorage.setItem('successfulRegister', JSON.stringify(successfulRegister))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const signin = (username, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {username, password}});
    try {
        const {data} = await Axios.post('/login', {username, password},
            {headers: {'g-recaptcha': 'test'}});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('successfulRegister');
    dispatch({type: USER_SIGNOUT});
}