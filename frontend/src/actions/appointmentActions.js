import Axios from "axios";
import {
    ALL_APPOINTMENT_OF_DAY_FAIL,
    ALL_APPOINTMENT_OF_DAY_REQUEST, ALL_APPOINTMENT_OF_DAY_SUCCESS,
    APPOINTMENT_ADD_FAIL,
    APPOINTMENT_ADD_REQUEST,
    APPOINTMENT_ADD_SUCCESS,
    APPOINTMENT_DELETE_FAIL,
    APPOINTMENT_DELETE_REQUEST,
    APPOINTMENT_DELETE_SUCCESS, APPOINTMENT_OF_DAY_FAIL, APPOINTMENT_OF_DAY_REQUEST, APPOINTMENT_OF_DAY_SUCCESS,
    APPOINTMENT_UPDATE_PAYMENT_FAIL,
    APPOINTMENT_UPDATE_PAYMENT_REQUEST,
    APPOINTMENT_UPDATE_PAYMENT_SUCCESS,
    USER_APPOINTMENT_LIST_FAIL,
    USER_APPOINTMENT_LIST_REQUEST,
    USER_APPOINTMENT_LIST_SUCCESS
} from "../constants/appointmentConstants";

export const addAppointment = (date, fromTime, description, repairType, paymentType, cost, mechanicalServiceId, carId) => async (dispatch, getState) => {
    dispatch({type: APPOINTMENT_ADD_REQUEST});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await Axios.post(`/appointments`, {
                'date': date,
                'fromTime': fromTime,
                'description': description,
                'repairType': repairType,
                'paymentType': paymentType,
                'cost': cost,
                'mechanicalServiceId': mechanicalServiceId,
                'carId': carId
            },
            {
                headers: {Authorization: `Bearer ${userInfo.token}`}
            });
        const appointment = {
            id: data.id,
            date: date,
            fromTime: fromTime,
            description: description,
            repairType: repairType,
            paymentType: paymentType,
            cost: cost,
            mechanicalServiceId: mechanicalServiceId,
            carId: carId
        }
        dispatch({type: APPOINTMENT_ADD_SUCCESS, payload: appointment});
        if (paymentType === 'Online') {
            dispatch(payAppointment(appointment.id));
        }
        localStorage.setItem('addedAppointment', JSON.stringify(appointment))
    } catch (error) {
        dispatch({
            type: APPOINTMENT_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const payAppointment = (appointmentId) => async (dispatch, getState) => {
    dispatch({type: APPOINTMENT_UPDATE_PAYMENT_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        await Axios.post(`/appointments/paid/${appointmentId}`, {}, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        const paidAppointment = {
            'appointmentId': appointmentId,
            'paymentStatus': "Opłacone"
        }
        dispatch({type: APPOINTMENT_UPDATE_PAYMENT_SUCCESS, payload: paidAppointment});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: APPOINTMENT_UPDATE_PAYMENT_FAIL, payload: message});
    }
};

export const deleteAppointment = (id) => async (dispatch, getState) => {
    dispatch({type: APPOINTMENT_DELETE_REQUEST, payload: id});
    const {userSignin: {userInfo}} = getState();
    try {
        await Axios.post(`/appointments/${id}`, {}, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: APPOINTMENT_DELETE_SUCCESS});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: APPOINTMENT_DELETE_FAIL, payload: message});
    }
};

export const listUserAppointments = () => async (dispatch, getState) => {
    dispatch({type: USER_APPOINTMENT_LIST_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/appointments/user`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: USER_APPOINTMENT_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: USER_APPOINTMENT_LIST_FAIL, payload: message});
    }
};

export const listAppointmentsOfDay = (dayOfWork) => async (dispatch, getState) => {
    dispatch({type: ALL_APPOINTMENT_OF_DAY_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.post(`/appointments/day`, {'dayOfWork': dayOfWork}, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        },);
        dispatch({type: ALL_APPOINTMENT_OF_DAY_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: ALL_APPOINTMENT_OF_DAY_FAIL, payload: message});
    }
};

export const appointmentOfDay = (id) => async (dispatch, getState) => {
    dispatch({type: APPOINTMENT_OF_DAY_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/appointments/day${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        },);
        dispatch({type: APPOINTMENT_OF_DAY_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: APPOINTMENT_OF_DAY_FAIL, payload: message});
    }
};