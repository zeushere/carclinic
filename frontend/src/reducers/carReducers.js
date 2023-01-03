import {
    CAR_DELETE_FAIL,
    CAR_DELETE_REQUEST, CAR_DELETE_RESET, CAR_DELETE_SUCCESS,
    CAR_DETAILS_FAIL,
    CAR_DETAILS_REQUEST,
    CAR_DETAILS_SUCCESS,
    CAR_LIST_FAIL,
    CAR_LIST_REQUEST,
    CAR_LIST_SUCCESS
} from "../constants/carConstants";

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

export const carDetailsReducer = (
    state = { loading: true },
    action
) => {
    switch (action.type) {
        case CAR_DETAILS_REQUEST:
            return { loading: true };
        case CAR_DETAILS_SUCCESS:
            return { loading: false, car: action.payload };
        case CAR_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const carDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CAR_DELETE_REQUEST:
            return {loading: true};
        case CAR_DELETE_SUCCESS:
            return {loading: false, success: true};
        case CAR_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case CAR_DELETE_RESET:
            return {loading: false, success: false};
        default:
            return state;
    }
};