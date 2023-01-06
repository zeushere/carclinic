import Axios from "axios";
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS
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
    localStorage.removeItem('userDetails')
    dispatch({type: USER_DETAILS_RESET});
    dispatch({type: USER_SIGNOUT});
};

export const detailsUser = () => async (dispatch, getState) => {
    dispatch({type: USER_DETAILS_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/profile`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: USER_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: USER_DETAILS_FAIL, payload: message});
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: user});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.put(`/profile`, user, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });

        const username = data.login;
        const password = data.password;
        const {loginData} = await Axios.post('/login', {username, password},
            {headers: {'g-recaptcha': 'test'}});
        dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data});

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: USER_UPDATE_PROFILE_FAIL, payload: message});
    }
};