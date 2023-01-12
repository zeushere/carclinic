import {
    EMAIL_CONTACT_SEND_FAIL,
    EMAIL_CONTACT_SEND_REQUEST,
    EMAIL_CONTACT_SEND_RESET,
    EMAIL_CONTACT_SEND_SUCCESS
} from "../constants/contactConstants";

export const sendEmailContactReducer = (state = {}, action) => {
    switch (action.type) {
        case EMAIL_CONTACT_SEND_REQUEST:
            return {loading: true};
        case EMAIL_CONTACT_SEND_SUCCESS:
            return {loading: false, contactEmail: action.payload};
        case EMAIL_CONTACT_SEND_FAIL:
            return {loading: false, error: action.payload};
        case EMAIL_CONTACT_SEND_RESET:
            return {};
        default:
            return state;
    }
};