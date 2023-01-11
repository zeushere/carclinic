import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {
    userDetailsReducer,
    userRegisterReducer,
    userSigninReducer,
    userUpdateProfileReducer
} from "../reducers/userReducers";
import {
    carAddImageReducer,
    carAddReducer,
    carDeleteReducer,
    carDetailsReducer, carFaultsReducer,
    carListReducer
} from "../reducers/carReducers";
import {mechanicalServicesListReducer} from "../reducers/mechanicalServicesReducers";
import {rabatCodeDiscountReducer} from "../reducers/rabatCodesReducer";
import {availableWorkingPeriodListReducer} from "../reducers/workingPeriodReducers";
import {appointmentAddReducer} from "../reducers/appointmentReduces";

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
    carDetails: carDetailsReducer,
    carDelete: carDeleteReducer,
    carAdd: carAddReducer,
    mechanicalServicesList: mechanicalServicesListReducer,
    carFaults: carFaultsReducer,
    rabatDiscount: rabatCodeDiscountReducer,
    availableWorkingPeriods: availableWorkingPeriodListReducer,
    addedAppointment: appointmentAddReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;