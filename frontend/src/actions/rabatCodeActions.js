import Axios from "axios";
import {
    RABAT_CODE_ADD_FAIL,
    RABAT_CODE_ADD_REQUEST,
    RABAT_CODE_ADD_SUCCESS,
    RABAT_CODE_DELETE_FAIL,
    RABAT_CODE_DELETE_REQUEST,
    RABAT_CODE_DELETE_SUCCESS,
    RABAT_CODE_DETAILS_FAIL,
    RABAT_CODE_DETAILS_REQUEST,
    RABAT_CODE_DETAILS_SUCCESS,
    RABAT_CODE_DISCOUNT_FAIL,
    RABAT_CODE_DISCOUNT_REQUEST,
    RABAT_CODE_DISCOUNT_SUCCESS,
    RABAT_CODE_UPDATE_FAIL,
    RABAT_CODE_UPDATE_REQUEST,
    RABAT_CODE_UPDATE_SUCCESS,
    RABAT_CODES_LIST_FAIL,
    RABAT_CODES_LIST_REQUEST,
    RABAT_CODES_LIST_SUCCESS
} from "../constants/rabatCodeConstants";

export const rabatCodeDiscount = (code) => async (dispatch, getState) => {
    dispatch({type: RABAT_CODE_DISCOUNT_REQUEST, payload: code});
    try {
        const {data} = await Axios.get(`/rabat-code/${code}`);
        localStorage.setItem('discountSize', JSON.stringify(data.discountSize))

        dispatch({type: RABAT_CODE_DISCOUNT_SUCCESS, payload: data.discountSize});
    } catch (error) {
        dispatch({
            type: RABAT_CODE_DISCOUNT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listRabatCodes = () => async (dispatch, getState) => {
    dispatch({type: RABAT_CODES_LIST_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/rabat-code`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: RABAT_CODES_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: RABAT_CODES_LIST_FAIL, payload: message});
    }
};

export const detailsRabatCode = (id) => async (dispatch, getState) => {
    dispatch({type: RABAT_CODE_DETAILS_REQUEST, payload: id});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/rabat-code/details/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: RABAT_CODE_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: RABAT_CODE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addRabatCode = (code, discountSize) => async (dispatch, getState) => {
    dispatch({type: RABAT_CODE_ADD_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.post(`/rabat-code`,
            {
                code,
                discountSize
            }
            , {
                headers: {Authorization: `Bearer ${userInfo.token}`},
            });
        dispatch({type: RABAT_CODE_ADD_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: RABAT_CODE_ADD_FAIL, error: message});
    }
};

export const updateRabatCode = (id, code, discountSize) => async (dispatch, getState) => {
    dispatch({type: RABAT_CODE_UPDATE_REQUEST, payload: id});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.put(`/rabat-code/${id}`,
            {
                code,
                discountSize,
            }
            , {
                headers: {Authorization: `Bearer ${userInfo.token}`},
            });
        dispatch({type: RABAT_CODE_UPDATE_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: RABAT_CODE_UPDATE_FAIL, error: message});
    }
};

export const deleteRabatCode = (id) => async (dispatch, getState) => {
    dispatch({type: RABAT_CODE_DELETE_REQUEST, payload: id});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await Axios.delete(`/rabat-code/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: RABAT_CODE_DELETE_SUCCESS});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: RABAT_CODE_DELETE_FAIL, payload: message});
    }
};