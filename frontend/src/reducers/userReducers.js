import {
    CHECK_USER_REGULAR_CUSTOMER_FAIL,
    CHECK_USER_REGULAR_CUSTOMER_REQUEST,
    CHECK_USER_REGULAR_CUSTOMER_RESET,
    CHECK_USER_REGULAR_CUSTOMER_SUCCESS,
    GET_USER_FOR_ADMIN_FAIL,
    GET_USER_FOR_ADMIN_REQUEST,
    GET_USER_FOR_ADMIN_SUCCESS,
    GET_USER_ROLE_FAIL,
    GET_USER_ROLE_REQUEST,
    GET_USER_ROLE_RESET,
    GET_USER_ROLE_SUCCESS,
    GET_USERS_WITH_ADMIN_ROLE_FAIL,
    GET_USERS_WITH_ADMIN_ROLE_REQUEST,
    GET_USERS_WITH_ADMIN_ROLE_RESET,
    GET_USERS_WITH_ADMIN_ROLE_SUCCESS,
    GET_USERS_WITH_EMPLOYEE_ROLE_FAIL,
    GET_USERS_WITH_EMPLOYEE_ROLE_REQUEST,
    GET_USERS_WITH_EMPLOYEE_ROLE_RESET,
    GET_USERS_WITH_EMPLOYEE_ROLE_SUCCESS,
    GET_USERS_WITH_USER_ROLE_FAIL,
    GET_USERS_WITH_USER_ROLE_REQUEST,
    GET_USERS_WITH_USER_ROLE_RESET,
    GET_USERS_WITH_USER_ROLE_SUCCESS,
    UPDATE_USER_BY_ADMIN_FAIL,
    UPDATE_USER_BY_ADMIN_REQUEST,
    UPDATE_USER_BY_ADMIN_RESET,
    UPDATE_USER_BY_ADMIN_SUCCESS,
    USER_DELETE_BY_ADMIN_FAIL,
    USER_DELETE_BY_ADMIN_REQUEST,
    USER_DELETE_BY_ADMIN_RESET,
    USER_DELETE_BY_ADMIN_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_REGISTER_BY_ADMIN_FAIL,
    USER_REGISTER_BY_ADMIN_REQUEST,
    USER_REGISTER_BY_ADMIN_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants";
import {
    CAR_DELETE_FAIL,
    CAR_DELETE_REQUEST, CAR_DELETE_RESET, CAR_DELETE_SUCCESS,
    CAR_LIST_FAIL,
    CAR_LIST_REQUEST,
    CAR_LIST_RESET,
    CAR_LIST_SUCCESS
} from "../constants/carConstants";
import {
    MECHANICAL_SERVICE_DETAILS_FAIL,
    MECHANICAL_SERVICE_DETAILS_REQUEST,
    MECHANICAL_SERVICE_DETAILS_SUCCESS
} from "../constants/mechanicalServicesConstants";
import {
    APPOINTMENT_ADD_FAIL,
    APPOINTMENT_ADD_REQUEST, APPOINTMENT_ADD_RESET,
    APPOINTMENT_ADD_SUCCESS
} from "../constants/appointmentConstants";
import {checkUserRegularCustomer} from "../actions/userActions";

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload};
        case USER_SIGNOUT:
            localStorage.clear();
            return {};
        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, successfulRegister: action.payload.successfulRegister};
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload};
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
}

export const userDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {loading: true};
        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload};
        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        case USER_DETAILS_RESET:
            return {};
        default:
            return state;
    }
};

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true};
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, success: true};
        case USER_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload};
        case USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
};

export const getUserRoleReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_ROLE_REQUEST:
            return {loading: true};
        case GET_USER_ROLE_SUCCESS:
            return {loading: false, role: action.payload};
        case GET_USER_ROLE_FAIL:
            return {loading: false, error: action.payload};
        case GET_USER_ROLE_RESET:
            return {};
        default:
            return state;
    }
};

export const getUsersWithUserRoleReducer = (
    state = {loading: true, users: []},
    action
) => {
    switch (action.type) {
        case GET_USERS_WITH_USER_ROLE_REQUEST:
            return {loading: true};
        case GET_USERS_WITH_USER_ROLE_SUCCESS:
            return {loading: false, users: action.payload};
        case GET_USERS_WITH_USER_ROLE_FAIL:
            return {loading: false, error: action.payload};
        case GET_USERS_WITH_USER_ROLE_RESET:
            return {}
        default:
            return state;
    }
};

export const getUsersWithEmployeeRoleReducer = (
    state = {loading: true, employees: []},
    action
) => {
    switch (action.type) {
        case GET_USERS_WITH_EMPLOYEE_ROLE_REQUEST:
            return {loading: true};
        case GET_USERS_WITH_EMPLOYEE_ROLE_SUCCESS:
            return {loading: false, employees: action.payload};
        case GET_USERS_WITH_EMPLOYEE_ROLE_FAIL:
            return {loading: false, error: action.payload};
        case GET_USERS_WITH_EMPLOYEE_ROLE_RESET:
            return {}
        default:
            return state;
    }
};

export const getUsersWithAdminRoleReducer = (
    state = {loading: true, admins: []},
    action
) => {
    switch (action.type) {
        case GET_USERS_WITH_ADMIN_ROLE_REQUEST:
            return {loading: true};
        case GET_USERS_WITH_ADMIN_ROLE_SUCCESS:
            return {loading: false, admins: action.payload};
        case GET_USERS_WITH_ADMIN_ROLE_FAIL:
            return {loading: false, error: action.payload};
        case GET_USERS_WITH_ADMIN_ROLE_RESET:
            return {}
        default:
            return state;
    }
};

export const getUserForAdminReducer = (
    state = {loading: true},
    action
) => {
    switch (action.type) {
        case GET_USER_FOR_ADMIN_REQUEST:
            return {loading: true};
        case GET_USER_FOR_ADMIN_SUCCESS:
            return {loading: false, user: action.payload};
        case GET_USER_FOR_ADMIN_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const updateUserByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_BY_ADMIN_REQUEST:
            return {loading: true};
        case UPDATE_USER_BY_ADMIN_SUCCESS:
            return {loading: false, updatedUser: action.payload};
        case UPDATE_USER_BY_ADMIN_FAIL:
            return {loading: false, error: action.payload};
        case UPDATE_USER_BY_ADMIN_RESET:
            return {};
        default:
            return state;
    }
};

export const checkUserRegularCustomerReducer = (state = {}, action) => {
    switch (action.type) {
        case CHECK_USER_REGULAR_CUSTOMER_REQUEST:
            return {loading: true};
        case CHECK_USER_REGULAR_CUSTOMER_SUCCESS:
            return {loading: false, regularCustomer: action.payload};
        case CHECK_USER_REGULAR_CUSTOMER_FAIL:
            return {loading: false, error: action.payload};
        case CHECK_USER_REGULAR_CUSTOMER_RESET:
            return {};
        default:
            return state;
    }
};

export const userRegisterByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_BY_ADMIN_REQUEST:
            return {loading: true};
        case USER_REGISTER_BY_ADMIN_SUCCESS:
            return {loading: false, userRegisterId: action.payload};
        case USER_REGISTER_BY_ADMIN_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userDeleteByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_BY_ADMIN_REQUEST:
            return {loading: true};
        case USER_DELETE_BY_ADMIN_SUCCESS:
            return {loading: false, success: true};
        case USER_DELETE_BY_ADMIN_FAIL:
            return {loading: false, error: action.payload};
        case USER_DELETE_BY_ADMIN_RESET:
            return {loading: false, success: false};
        default:
            return state;
    }
}