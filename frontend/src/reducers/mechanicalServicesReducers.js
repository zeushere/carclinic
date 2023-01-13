import {
    MECHANICAL_SERVICE_ADD_FAIL,
    MECHANICAL_SERVICE_ADD_REQUEST,
    MECHANICAL_SERVICE_ADD_RESET,
    MECHANICAL_SERVICE_ADD_SUCCESS,
    MECHANICAL_SERVICE_DELETE_FAIL,
    MECHANICAL_SERVICE_DELETE_REQUEST,
    MECHANICAL_SERVICE_DELETE_RESET,
    MECHANICAL_SERVICE_DELETE_SUCCESS,
    MECHANICAL_SERVICE_DETAILS_FAIL,
    MECHANICAL_SERVICE_DETAILS_REQUEST,
    MECHANICAL_SERVICE_DETAILS_SUCCESS,
    MECHANICAL_SERVICE_UPDATE_FAIL,
    MECHANICAL_SERVICE_UPDATE_REQUEST,
    MECHANICAL_SERVICE_UPDATE_RESET,
    MECHANICAL_SERVICE_UPDATE_SUCCESS,
    MECHANICAL_SERVICES_FAIL,
    MECHANICAL_SERVICES_LIST_REQUEST,
    MECHANICAL_SERVICES_LIST_SUCCESS
} from "../constants/mechanicalServicesConstants";

export const mechanicalServicesListReducer = (
    state = {loading: true, mechanicalServices: []},
    action) => {
    switch (action.type) {
        case MECHANICAL_SERVICES_LIST_REQUEST:
            return {loading: true};
        case MECHANICAL_SERVICES_LIST_SUCCESS:
            return {loading: false, mechanicalServices: action.payload};
        case MECHANICAL_SERVICES_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const mechanicalServiceDetailsReducer = (
    state = {loading: true},
    action
) => {
    switch (action.type) {
        case MECHANICAL_SERVICE_DETAILS_REQUEST:
            return {loading: true};
        case MECHANICAL_SERVICE_DETAILS_SUCCESS:
            return {loading: false, mechanicalService: action.payload};
        case MECHANICAL_SERVICE_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const mechanicalServiceAddReducer = (state = {}, action) => {
    switch (action.type) {
        case MECHANICAL_SERVICE_ADD_REQUEST:
            return {loading: true};
        case MECHANICAL_SERVICE_ADD_SUCCESS:
            return {loading: false, mechanicalServiceId: action.payload};
        case MECHANICAL_SERVICE_ADD_FAIL:
            return {loading: false, error: action.payload};
        case MECHANICAL_SERVICE_ADD_RESET:
            return {};
        default:
            return state;

    }
}

export const mechanicalServiceUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case MECHANICAL_SERVICE_UPDATE_REQUEST:
            return {loading: true};
        case MECHANICAL_SERVICE_UPDATE_SUCCESS:
            return {loading: false, success: true};
        case MECHANICAL_SERVICE_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case MECHANICAL_SERVICE_UPDATE_RESET:
            return {};
        default:
            return state;

    }
}

export const mechanicalServiceDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case MECHANICAL_SERVICE_DELETE_REQUEST:
            return {loading: true};
        case MECHANICAL_SERVICE_DELETE_SUCCESS:
            return {loading: false, success: true};
        case MECHANICAL_SERVICE_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case MECHANICAL_SERVICE_DELETE_RESET:
            return {loading: false, success: false};
        default:
            return state;
    }
}