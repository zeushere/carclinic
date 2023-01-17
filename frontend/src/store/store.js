import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {
    checkUserRegularCustomerReducer,
    getUserForAdminReducer,
    getUserRoleReducer,
    getUsersWithAdminRoleReducer,
    getUsersWithEmployeeRoleReducer,
    getUsersWithUserRoleReducer,
    updateUserByAdminReducer,
    userDeleteByAdminReducer,
    userDetailsReducer,
    userRegisterByAdminReducer,
    userRegisterReducer,
    userSigninReducer,
    userUpdateProfileReducer
} from "../reducers/userReducers";
import {
    carAddImageReducer,
    carAddReducer,
    carAppointmentsReducer,
    carDeleteReducer,
    carDetailsReducer,
    carFaultsReducer,
    carListReducer
} from "../reducers/carReducers";
import {
    mechanicalServiceAddReducer,
    mechanicalServiceDeleteReducer,
    mechanicalServiceDetailsReducer,
    mechanicalServicesListReducer,
    mechanicalServiceUpdateReducer
} from "../reducers/mechanicalServicesReducers";
import {
    rabatCodeAddReducer,
    rabatCodeDeleteReducer,
    rabatCodeDetailsReducer,
    rabatCodeDiscountReducer,
    rabatCodesListReducer,
    rabatCodeUpdateReducer
} from "../reducers/rabatCodesReducer";
import {availableWorkingPeriodListReducer} from "../reducers/workingPeriodReducers";
import {
    allAppointmentsOfDayReducer,
    appointmentAddReducer,
    appointmentDeleteReducer,
    appointmentOfDayDetailsReducer,
    payAppointmentReducer,
    setCompleteAppointmentReducer,
    setInProgressAppointmentReducer,
    userAppointmentsListReducer
} from "../reducers/appointmentReducers";
import {sendEmailContactReducer} from "../reducers/contactReducers";
import {
    blogAddImageReducer,
    blogAddReducer,
    blogDeleteReducer,
    blogDetailsReducer,
    blogListReducer,
    blogUpdateReducer
} from "../reducers/blogReducers";

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    userRegister: {
        successfulRegister: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('successfulRegister'))
            : null,
    },

    userRole: {
        role: localStorage.getItem('userRole')
            ? JSON.parse(localStorage.getItem('userRole'))
            : null,
    },

    userDetails: {
        user: null
    }

}

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    carList: carListReducer,
    appointmentList: userAppointmentsListReducer,
    carDetails: carDetailsReducer,
    mechanicalServiceDetails: mechanicalServiceDetailsReducer,
    carDelete: carDeleteReducer,
    mechanicalServiceDelete: mechanicalServiceDeleteReducer,
    sendedContactEmail: sendEmailContactReducer,
    appointmentDelete: appointmentDeleteReducer,
    carAdd: carAddReducer,
    mechanicalServicesList: mechanicalServicesListReducer,
    carFaults: carFaultsReducer,
    rabatDiscount: rabatCodeDiscountReducer,
    availableWorkingPeriods: availableWorkingPeriodListReducer,
    addedAppointment: appointmentAddReducer,
    paidAppointment: payAppointmentReducer,
    carAppointments: carAppointmentsReducer,
    userRole: getUserRoleReducer,
    mechanicalServiceUpdate: mechanicalServiceUpdateReducer,
    addedMechanicalServiceId: mechanicalServiceAddReducer,
    allAppointmentsOfDay: allAppointmentsOfDayReducer,
    appointmentOfDayDetails: appointmentOfDayDetailsReducer,
    setProgressAppointment: setInProgressAppointmentReducer,
    setCompletedAppointment: setCompleteAppointmentReducer,
    usersWithUserRole: getUsersWithUserRoleReducer,
    usersWithEmployeeRole: getUsersWithEmployeeRoleReducer,
    usersWithAdminRole: getUsersWithAdminRoleReducer,
    userForAdmin: getUserForAdminReducer,
    updatedUserByAdmin: updateUserByAdminReducer,
    isUserRegularCustomer: checkUserRegularCustomerReducer,
    userRegisteredByAdminId: userRegisterByAdminReducer,
    isUserDeletedByAdmin: userDeleteByAdminReducer,
    rabatCodesList: rabatCodesListReducer,
    rabatCodeDelete: rabatCodeDeleteReducer,
    rabatCodeDetails: rabatCodeDetailsReducer,
    rabatCodeUpdate: rabatCodeUpdateReducer,
    rabatCodeAddedId: rabatCodeAddReducer,
    blogList: blogListReducer,
    blogDelete: blogDeleteReducer,
    blogDetails: blogDetailsReducer,
    blogUpdate: blogUpdateReducer,
    blogAdded: blogAddReducer,
    isImageAddedToBlog: blogAddImageReducer,
    isImageAddedToCar: carAddImageReducer,

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;