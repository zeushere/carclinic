import Axios from "axios";
import {
    RABAT_CODE_DISCOUNT_FAIL,
    RABAT_CODE_DISCOUNT_REQUEST,
    RABAT_CODE_DISCOUNT_SUCCESS
} from "../constants/rabatCodeConstants";

export const rabatCodeDiscount = (code) => async (dispatch, getState) => {
    dispatch({type: RABAT_CODE_DISCOUNT_REQUEST, payload: code});
    try {
        const {data} = await Axios.get(`/rabat-code/${code}`);
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