import Axios from "axios";
import {
    MECHANICAL_SERVICE_ADD_FAIL,
    MECHANICAL_SERVICE_ADD_REQUEST,
    MECHANICAL_SERVICE_ADD_SUCCESS,
    MECHANICAL_SERVICE_DELETE_FAIL,
    MECHANICAL_SERVICE_DELETE_REQUEST,
    MECHANICAL_SERVICE_DELETE_SUCCESS,
    MECHANICAL_SERVICE_DETAILS_FAIL,
    MECHANICAL_SERVICE_DETAILS_REQUEST,
    MECHANICAL_SERVICE_DETAILS_SUCCESS,
    MECHANICAL_SERVICE_UPDATE_FAIL,
    MECHANICAL_SERVICE_UPDATE_REQUEST,
    MECHANICAL_SERVICE_UPDATE_SUCCESS,
    MECHANICAL_SERVICES_FAIL,
    MECHANICAL_SERVICES_LIST_REQUEST,
    MECHANICAL_SERVICES_LIST_SUCCESS
} from "../constants/mechanicalServicesConstants";

export const listMechanicalServices = () => async (dispatch) => {
    dispatch({type: MECHANICAL_SERVICES_LIST_REQUEST});
    try {
        const {data} = await Axios.get(`/mechanical-services`)
        dispatch({type: MECHANICAL_SERVICES_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: MECHANICAL_SERVICES_FAIL, payload: message});
    }
};

export const detailsMechanicalService = (id) => async (dispatch, getState) => {
    dispatch({type: MECHANICAL_SERVICE_DETAILS_REQUEST, payload: id});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/mechanical-services/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: MECHANICAL_SERVICE_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: MECHANICAL_SERVICE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addMechanicalService = (name, expectedExecutionTime, expectedServiceCost) => async (dispatch, getState) => {
    dispatch({type: MECHANICAL_SERVICE_ADD_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.post(`/mechanical-services`,
            {
                name,
                expectedExecutionTime,
                expectedServiceCost
            }
            , {
                headers: {Authorization: `Bearer ${userInfo.token}`},
            });
        dispatch({type: MECHANICAL_SERVICE_ADD_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: MECHANICAL_SERVICE_ADD_FAIL, error: message});
    }
};

export const updateMechanicalService = (id, name, expectedExecutionTime, expectedServiceCost) => async (dispatch, getState) => {
    dispatch({type: MECHANICAL_SERVICE_UPDATE_REQUEST, payload: id});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.put(`/mechanical-services/${id}`,
            {
                name,
                expectedExecutionTime,
                expectedServiceCost
            }
            , {
                headers: {Authorization: `Bearer ${userInfo.token}`},
            });
        dispatch({type: MECHANICAL_SERVICE_UPDATE_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: MECHANICAL_SERVICE_UPDATE_FAIL, error: message});
    }
};

export const deleteMechanicalService = (id) => async (dispatch, getState) => {
    dispatch({type: MECHANICAL_SERVICE_DELETE_REQUEST, payload: id});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await Axios.delete(`/mechanical-services/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: MECHANICAL_SERVICE_DELETE_SUCCESS});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: MECHANICAL_SERVICE_DELETE_FAIL, payload: message});
    }
};