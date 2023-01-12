import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {
    userDetailsReducer,
    userRegisterReducer,
    userSigninReducer,
    userUpdateProfileReducer
} from "../reducers/userReducers";
import {
    carAddReducer, carAppointmentsReducer,
    carDeleteReducer,
    carDetailsReducer,
    carFaultsReducer,
    carListReducer
} from "../reducers/carReducers";
import {mechanicalServicesListReducer} from "../reducers/mechanicalServicesReducers";
import {rabatCodeDiscountReducer} from "../reducers/rabatCodesReducer";
import {availableWorkingPeriodListReducer} from "../reducers/workingPeriodReducers";
import {
    appointmentAddReducer,
    appointmentDeleteReducer,
    payAppointmentReducer,
    userAppointmentsListReducer
} from "../reducers/appointmentReducers";
import {sendEmailContactReducer} from "../reducers/contactReducers";

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
    carDelete: carDeleteReducer,
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
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;