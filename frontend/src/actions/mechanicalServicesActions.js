import Axios from "axios";
import {
    MECHANICAL_SERVICES_FAIL,
    MECHANICAL_SERVICES_LIST_REQUEST,
    MECHANICAL_SERVICES_LIST_SUCCESS
} from "../constants/mechanicalServicesConstants";
import {USER_UPDATE_PROFILE_SUCCESS} from "../constants/userConstants";

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