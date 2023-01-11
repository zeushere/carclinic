import {CAR_DETAILS_FAIL, CAR_DETAILS_REQUEST, CAR_DETAILS_SUCCESS} from "../constants/carConstants";
import {
    RABAT_CODE_DISCOUNT_FAIL,
    RABAT_CODE_DISCOUNT_REQUEST,
    RABAT_CODE_DISCOUNT_SUCCESS
} from "../constants/rabatCodeConstants";

export const rabatCodeDiscountReducer = (
    state = {loading: true},
    action
) => {
    switch (action.type) {
        case RABAT_CODE_DISCOUNT_REQUEST:
            return {loading: true};
        case RABAT_CODE_DISCOUNT_SUCCESS:
            return {loading: false, discount: action.payload};
        case RABAT_CODE_DISCOUNT_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};