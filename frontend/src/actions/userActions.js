import Axios from "axios";
import {
    CHECK_USER_REGULAR_CUSTOMER_FAIL,
    CHECK_USER_REGULAR_CUSTOMER_REQUEST,
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
    GET_USERS_WITH_ADMIN_ROLE_SUCCESS,
    GET_USERS_WITH_EMPLOYEE_ROLE_FAIL,
    GET_USERS_WITH_EMPLOYEE_ROLE_REQUEST,
    GET_USERS_WITH_EMPLOYEE_ROLE_SUCCESS,
    GET_USERS_WITH_USER_ROLE_FAIL,
    GET_USERS_WITH_USER_ROLE_REQUEST,
    GET_USERS_WITH_USER_ROLE_SUCCESS,
    UPDATE_USER_BY_ADMIN_FAIL,
    UPDATE_USER_BY_ADMIN_REQUEST,
    UPDATE_USER_BY_ADMIN_SUCCESS,
    USER_DELETE_BY_ADMIN_FAIL,
    USER_DELETE_BY_ADMIN_REQUEST,
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
    USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants";
import {CAR_LIST_RESET} from "../constants/carConstants";

export const register = (firstName, lastName, address, login, email, password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {email, password}});
    try {
        await Axios.post('/register', {
                firstName,
                lastName,
                email,
                login,
                password,
                address
            },
            {params: {'g-recaptcha': 'test'}});
        const successfulRegister = true;
        dispatch({type: USER_REGISTER_SUCCESS, payload: {successfulRegister}});
        localStorage.setItem('successfulRegister', JSON.stringify(successfulRegister))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const signin = (username, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {username, password}});
    try {
        const {data} = await Axios.post('/login', {username, password},
            {headers: {'g-recaptcha': 'test'}});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('successfulRegister');
    localStorage.removeItem('userDetails')
    dispatch({type: USER_DETAILS_RESET});
    dispatch({type: USER_SIGNOUT});
    dispatch({type: CAR_LIST_RESET})
    dispatch({type: GET_USER_ROLE_RESET})
};

export const detailsUser = () => async (dispatch, getState) => {
    dispatch({type: USER_DETAILS_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/profile`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: USER_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: USER_DETAILS_FAIL, payload: message});
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: user});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.put(`/profile`, user, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        }).then(async () => {
            const username = data.login;
            const password = data.password;
            const {loginData} = await Axios.post('/login', {username, password},
                {headers: {'g-recaptcha': 'test'}});
            dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data});
        });


    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: USER_UPDATE_PROFILE_FAIL, payload: message});
    }
};

export const getUserRole = () => async (dispatch, getState) => {
    dispatch({type: GET_USER_ROLE_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/user-role`, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: GET_USER_ROLE_SUCCESS, payload: data.role})
        localStorage.setItem('userRole', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: GET_USER_ROLE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getUsersWithUserRole = () => async (dispatch, getState) => {
    dispatch({type: GET_USERS_WITH_USER_ROLE_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/admin/users`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: GET_USERS_WITH_USER_ROLE_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: GET_USERS_WITH_USER_ROLE_FAIL, payload: message});
    }
};

export const getUsersWithEmployeeRole = () => async (dispatch, getState) => {
    dispatch({type: GET_USERS_WITH_EMPLOYEE_ROLE_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/admin/employees`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: GET_USERS_WITH_EMPLOYEE_ROLE_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: GET_USERS_WITH_EMPLOYEE_ROLE_FAIL, payload: message});
    }
};

export const getUsersWithAdminRole = () => async (dispatch, getState) => {
    dispatch({type: GET_USERS_WITH_ADMIN_ROLE_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/admin/admins`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: GET_USERS_WITH_ADMIN_ROLE_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: GET_USERS_WITH_ADMIN_ROLE_FAIL, payload: message});
    }
};

export const getUserForAdmin = (id) => async (dispatch, getState) => {
    dispatch({type: GET_USER_FOR_ADMIN_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/admin/users/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: GET_USER_FOR_ADMIN_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: GET_USER_FOR_ADMIN_FAIL, payload: message});
    }
};

export const updateUserByAdmin = (id, firstName, lastName, email, login, password, address, role, isRegularCustomer) => async (dispatch, getState) => {
    dispatch({type: UPDATE_USER_BY_ADMIN_REQUEST});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await Axios.patch(`/admin/edit/${id}`, {
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'login': login,
                'password': password,
                'role': role,
                'address' : address,
                'isRegularCustomer': isRegularCustomer
            },
            {
                headers: {Authorization: `Bearer ${userInfo.token}`}
            });
        dispatch({type: UPDATE_USER_BY_ADMIN_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: UPDATE_USER_BY_ADMIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const checkUserRegularCustomer = () => async (dispatch, getState) => {
    dispatch({type: CHECK_USER_REGULAR_CUSTOMER_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`/users/regular-customer`, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: CHECK_USER_REGULAR_CUSTOMER_SUCCESS, payload: data})
        localStorage.setItem('userRegularCustomer', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: CHECK_USER_REGULAR_CUSTOMER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const registerUserByAdmin = (firstName, lastName, login, email, password,address, role, isRegularCustomer) => async (dispatch, getState) => {
    dispatch({type: USER_REGISTER_BY_ADMIN_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.post('/admin/register', {
                firstName,
                lastName,
                email,
                login,
                password,
                address,
                role,
                isRegularCustomer
            },
            {
                params: {'g-recaptcha': 'test'},
                headers: {Authorization: `Bearer ${userInfo.token}`}
            });
        dispatch({type: USER_REGISTER_BY_ADMIN_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: USER_REGISTER_BY_ADMIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteUserByAdmin = (id) => async (dispatch, getState) => {
    dispatch({type: USER_DELETE_BY_ADMIN_REQUEST, payload: id});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await Axios.delete(`/admin/users/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: USER_DELETE_BY_ADMIN_SUCCESS});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: USER_DELETE_BY_ADMIN_FAIL, payload: message});
    }
};