import {CAR_LIST_FAIL, CAR_LIST_REQUEST, CAR_LIST_SUCCESS} from "../constants/carConstants";

export const carListReducer = (
    state = { loading: true, cars: [] },
    action
) => {
    switch (action.type) {
        case CAR_LIST_REQUEST:
            return { loading: true };
        case CAR_LIST_SUCCESS:
            return { loading: false, cars: action.payload };
        case CAR_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};