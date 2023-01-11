import {CAR_ADD_FAIL, CAR_ADD_REQUEST, CAR_ADD_SUCCESS} from "../constants/carConstants";
import Axios from "axios";
import {
    APPOINTMENT_ADD_FAIL,
    APPOINTMENT_ADD_REQUEST,
    APPOINTMENT_ADD_SUCCESS
} from "../constants/appointmentConstants";
import {USER_SIGNIN_SUCCESS} from "../constants/userConstants";

export const addAppointment = (date, fromTime, description, repairType, paymentType, cost, mechanicalServiceId, carId) => async (dispatch, getState) => {
    dispatch({type: APPOINTMENT_ADD_REQUEST});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await Axios.post(`/appointments`, {
                'date':date,
                'fromTime':fromTime,
                'description':description,
                'repairType':repairType,
                'paymentType':paymentType,
                'cost':cost,
                'mechanicalServiceId':mechanicalServiceId,
                'carId':carId
            },
            {
                headers: {Authorization: `Bearer ${userInfo.token}`}
            });
        dispatch({type: APPOINTMENT_ADD_SUCCESS, payload: data});
        localStorage.setItem('addedAppointment', data)
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