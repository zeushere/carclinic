import {CAR_LIST_FAIL, CAR_LIST_REQUEST, CAR_LIST_SUCCESS} from "../constants/carConstants";
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