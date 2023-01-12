import Axios from "axios";
import {
    AVAILABLE_WORKING_PERIOD_FAIL,
    AVAILABLE_WORKING_PERIOD_LIST_REQUEST,
    AVAILABLE_WORKING_PERIOD_LIST_SUCCESS
} from "../constants/workingPeriodConstants";

export const availableWorkingPeriodList = (mechanicalServiceId, typeOfWork, dayOfWork) => async (dispatch) => {
    dispatch({type: AVAILABLE_WORKING_PERIOD_LIST_REQUEST});
    try {
        const {data} = await Axios.post(`/working-periods/${mechanicalServiceId}?typeOfWork=${typeOfWork}`,
            {'dayOfWork' : dayOfWork});
        dispatch({type: AVAILABLE_WORKING_PERIOD_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: AVAILABLE_WORKING_PERIOD_FAIL, payload: message});
    }
};