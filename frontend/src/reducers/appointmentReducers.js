import {
    ALL_APPOINTMENT_OF_DAY_FAIL,
    ALL_APPOINTMENT_OF_DAY_REQUEST, ALL_APPOINTMENT_OF_DAY_RESET, ALL_APPOINTMENT_OF_DAY_SUCCESS,
    APPOINTMENT_ADD_FAIL,
    APPOINTMENT_ADD_REQUEST,
    APPOINTMENT_ADD_RESET,
    APPOINTMENT_ADD_SUCCESS,
    APPOINTMENT_DELETE_FAIL,
    APPOINTMENT_DELETE_REQUEST,
    APPOINTMENT_DELETE_RESET,
    APPOINTMENT_DELETE_SUCCESS, APPOINTMENT_OF_DAY_FAIL, APPOINTMENT_OF_DAY_REQUEST, APPOINTMENT_OF_DAY_SUCCESS,
    APPOINTMENT_UPDATE_PAYMENT_FAIL,
    APPOINTMENT_UPDATE_PAYMENT_REQUEST,
    APPOINTMENT_UPDATE_PAYMENT_RESET,
    APPOINTMENT_UPDATE_PAYMENT_SUCCESS,
    USER_APPOINTMENT_LIST_FAIL,
    USER_APPOINTMENT_LIST_REQUEST,
    USER_APPOINTMENT_LIST_RESET,
    USER_APPOINTMENT_LIST_SUCCESS
} from "../constants/appointmentConstants";
import {
    MECHANICAL_SERVICE_DETAILS_FAIL,
    MECHANICAL_SERVICE_DETAILS_REQUEST,
    MECHANICAL_SERVICE_DETAILS_SUCCESS
} from "../constants/mechanicalServicesConstants";

export const appointmentAddReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_ADD_REQUEST:
            return {loading: true};
        case APPOINTMENT_ADD_SUCCESS:
            return {loading: false, appointment: action.payload};
        case APPOINTMENT_ADD_FAIL:
            return {loading: false, error: action.payload};
        case APPOINTMENT_ADD_RESET:
            return {};
        default:
            return state;
    }
};

export const payAppointmentReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_UPDATE_PAYMENT_REQUEST:
            return {loading: true};
        case APPOINTMENT_UPDATE_PAYMENT_SUCCESS:
            return {loading: false, paidAppointment: action.payload};
        case APPOINTMENT_UPDATE_PAYMENT_FAIL:
            return {loading: false, error: action.payload};
        case APPOINTMENT_UPDATE_PAYMENT_RESET:
            return {};
        default:
            return state;
    }
};

export const appointmentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_DELETE_REQUEST:
            return {loading: true};
        case APPOINTMENT_DELETE_SUCCESS:
            return {loading: false, success: true};
        case APPOINTMENT_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case APPOINTMENT_DELETE_RESET:
            return {loading: false, success: false};
        default:
            return state;
    }
}

export const userAppointmentsListReducer = (
    state = {loading: true, cars: []},
    action
) => {
    switch (action.type) {
        case USER_APPOINTMENT_LIST_REQUEST:
            return {loading: true};
        case USER_APPOINTMENT_LIST_SUCCESS:
            return {loading: false, userAppointments: action.payload};
        case USER_APPOINTMENT_LIST_FAIL:
            return {loading: false, error: action.payload};
        case USER_APPOINTMENT_LIST_RESET:
            return {}
        default:
            return state;
    }
};

export const allAppointmentsOfDayReducer = (
    state = {loading: true, appointmentsOfDay: []},
    action
) => {
    switch (action.type) {
        case ALL_APPOINTMENT_OF_DAY_REQUEST:
            return {loading: true};
        case ALL_APPOINTMENT_OF_DAY_SUCCESS:
            return {loading: false, allAppointmentsOfDay: action.payload};
        case ALL_APPOINTMENT_OF_DAY_FAIL:
            return {loading: false, error: action.payload};
        case ALL_APPOINTMENT_OF_DAY_RESET:
            return {}
        default:
            return state;
    }
};

export const appointmentOfDayDetailsReducer = (
    state = {loading: true},
    action
) => {
    switch (action.type) {
        case APPOINTMENT_OF_DAY_REQUEST:
            return {loading: true};
        case APPOINTMENT_OF_DAY_SUCCESS:
            return {loading: false, appointmentOfDay: action.payload};
        case APPOINTMENT_OF_DAY_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};