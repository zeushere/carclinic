import {
    CAR_ADD_FAIL, CAR_ADD_IMAGE_REQUEST,
    CAR_ADD_REQUEST, CAR_ADD_RESET,
    CAR_ADD_SUCCESS, CAR_APPOINTMENT_FAIL, CAR_APPOINTMENT_REQUEST, CAR_APPOINTMENT_SUCCESS,
    CAR_DELETE_FAIL,
    CAR_DELETE_REQUEST,
    CAR_DELETE_SUCCESS,
    CAR_DETAILS_FAIL,
    CAR_DETAILS_REQUEST,
    CAR_DETAILS_SUCCESS, CAR_FAULTS_FAIL, CAR_FAULTS_REQUEST, CAR_FAULTS_SUCCESS,
    CAR_LIST_FAIL,
    CAR_LIST_REQUEST,
    CAR_LIST_SUCCESS
} from "../constants/carConstants";
import Axios from "axios";

export const listCars = () => async (dispatch, getState) => {
    dispatch({type: CAR_LIST_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/cars`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: CAR_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: CAR_LIST_FAIL, payload: message});
    }
};

export const detailsCar = (id) => async (dispatch, getState) => {
    dispatch({type: CAR_DETAILS_REQUEST, payload: id});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/cars/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: CAR_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: CAR_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const carFaults = (id) => async (dispatch, getState) => {
    dispatch({type: CAR_FAULTS_REQUEST, payload: id});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/typical-faults/user/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: CAR_FAULTS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: CAR_FAULTS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const carAppointments = (id) => async (dispatch, getState) => {
    dispatch({type: CAR_APPOINTMENT_REQUEST, payload: id});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/appointments/user/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: CAR_APPOINTMENT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: CAR_APPOINTMENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteCar = (id) => async (dispatch, getState) => {
    dispatch({type: CAR_DELETE_REQUEST, payload: id});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await Axios.delete(`/cars/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: CAR_DELETE_SUCCESS});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: CAR_DELETE_FAIL, payload: message});
    }
};

export const addCar = (brand, model, yearProduction, engineType, carType, description) => async (dispatch, getState) => {
    dispatch({type: CAR_ADD_REQUEST});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await Axios.post(`/cars`, {
                brand,
                model,
                yearProduction,
                engineType,
                carType,
                description
            },
            {
                headers: {Authorization: `Bearer ${userInfo.token}`}
            });
        const carId = data.id
        dispatch({type: CAR_ADD_SUCCESS, payload: {carId}});
        localStorage.setItem('addedCarId', carId)
    } catch (error) {
        dispatch({
            type: CAR_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

