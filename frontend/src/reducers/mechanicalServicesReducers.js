import {CAR_LIST_FAIL, CAR_LIST_REQUEST, CAR_LIST_SUCCESS} from "../constants/carConstants";
import {
    MECHANICAL_SERVICES_FAIL,
    MECHANICAL_SERVICES_LIST_REQUEST,
    MECHANICAL_SERVICES_LIST_SUCCESS
} from "../constants/mechanicalServicesConstants";

export const mechanicalServicesListReducer = (
    state = {loading: true, mechanicalServices: []},
    action ) => {
    switch (action.type) {
        case MECHANICAL_SERVICES_LIST_REQUEST:
            return {loading: true};
        case MECHANICAL_SERVICES_LIST_SUCCESS:
            return {loading: false, cars: action.payload};
        case MECHANICAL_SERVICES_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};