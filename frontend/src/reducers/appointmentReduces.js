import {
    APPOINTMENT_ADD_FAIL,
    APPOINTMENT_ADD_REQUEST, APPOINTMENT_ADD_RESET,
    APPOINTMENT_ADD_SUCCESS
} from "../constants/appointmentConstants";

export const appointmentAddReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_ADD_REQUEST:
            return {loading: true};
        case APPOINTMENT_ADD_SUCCESS:
            return {loading: false, addedCarId: action.payload.appointment};
        case APPOINTMENT_ADD_FAIL:
            return {loading: false, error: action.payload};
        case APPOINTMENT_ADD_RESET:
            return {};
        default:
            return state;
    }
};