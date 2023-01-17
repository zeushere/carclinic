import {CAR_DETAILS_FAIL, CAR_DETAILS_REQUEST, CAR_DETAILS_SUCCESS} from "../constants/carConstants";
import {
    RABAT_CODE_ADD_FAIL,
    RABAT_CODE_ADD_REQUEST, RABAT_CODE_ADD_RESET, RABAT_CODE_ADD_SUCCESS,
    RABAT_CODE_DELETE_FAIL,
    RABAT_CODE_DELETE_REQUEST,
    RABAT_CODE_DELETE_RESET,
    RABAT_CODE_DELETE_SUCCESS,
    RABAT_CODE_DETAILS_FAIL,
    RABAT_CODE_DETAILS_REQUEST,
    RABAT_CODE_DETAILS_SUCCESS,
    RABAT_CODE_DISCOUNT_FAIL,
    RABAT_CODE_DISCOUNT_REQUEST, RABAT_CODE_DISCOUNT_RESET,
    RABAT_CODE_DISCOUNT_SUCCESS,
    RABAT_CODE_UPDATE_FAIL,
    RABAT_CODE_UPDATE_REQUEST,
    RABAT_CODE_UPDATE_RESET,
    RABAT_CODE_UPDATE_SUCCESS,
    RABAT_CODES_LIST_FAIL,
    RABAT_CODES_LIST_REQUEST,
    RABAT_CODES_LIST_SUCCESS
} from "../constants/rabatCodeConstants";
import {
    MECHANICAL_SERVICE_ADD_FAIL,
    MECHANICAL_SERVICE_ADD_REQUEST, MECHANICAL_SERVICE_ADD_RESET, MECHANICAL_SERVICE_ADD_SUCCESS,
    MECHANICAL_SERVICE_DELETE_FAIL,
    MECHANICAL_SERVICE_DELETE_REQUEST,
    MECHANICAL_SERVICE_DELETE_RESET,
    MECHANICAL_SERVICE_DELETE_SUCCESS,
    MECHANICAL_SERVICE_DETAILS_FAIL,
    MECHANICAL_SERVICE_DETAILS_REQUEST,
    MECHANICAL_SERVICE_DETAILS_SUCCESS, MECHANICAL_SERVICE_UPDATE_FAIL,
    MECHANICAL_SERVICE_UPDATE_REQUEST, MECHANICAL_SERVICE_UPDATE_RESET,
    MECHANICAL_SERVICE_UPDATE_SUCCESS,
    MECHANICAL_SERVICES_FAIL,
    MECHANICAL_SERVICES_LIST_REQUEST,
    MECHANICAL_SERVICES_LIST_SUCCESS
} from "../constants/mechanicalServicesConstants";

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
        case RABAT_CODE_DISCOUNT_RESET:
            return {};
        default:
            return state;
    }
};

export const rabatCodesListReducer = (
    state = {loading: true, rabatCodes: []},
    action) => {
    switch (action.type) {
        case RABAT_CODES_LIST_REQUEST:
            return {loading: true};
        case RABAT_CODES_LIST_SUCCESS:
            return {loading: false, rabatCodes: action.payload};
        case RABAT_CODES_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const rabatCodeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case RABAT_CODE_DELETE_REQUEST:
            return {loading: true};
        case RABAT_CODE_DELETE_SUCCESS:
            return {loading: false, success: true};
        case RABAT_CODE_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case RABAT_CODE_DELETE_RESET:
            return {loading: false, success: false};
        default:
            return state;
    }
}

export const rabatCodeDetailsReducer = (
    state = {loading: true},
    action
) => {
    switch (action.type) {
        case RABAT_CODE_DETAILS_REQUEST:
            return {loading: true};
        case RABAT_CODE_DETAILS_SUCCESS:
            return {loading: false, rabatCode: action.payload};
        case RABAT_CODE_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const rabatCodeAddReducer = (state = {}, action) => {
    switch (action.type) {
        case RABAT_CODE_ADD_REQUEST:
            return {loading: true};
        case RABAT_CODE_ADD_SUCCESS:
            return {loading: false, rabatCodeId: action.payload};
        case RABAT_CODE_ADD_FAIL:
            return {loading: false, error: action.payload};
        case RABAT_CODE_ADD_RESET:
            return {};
        default:
            return state;

    }
}

export const rabatCodeUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case RABAT_CODE_UPDATE_REQUEST:
            return {loading: true};
        case RABAT_CODE_UPDATE_SUCCESS:
            return {loading: false, success: true};
        case RABAT_CODE_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case RABAT_CODE_UPDATE_RESET:
            return {};
        default:
            return state;

    }
}