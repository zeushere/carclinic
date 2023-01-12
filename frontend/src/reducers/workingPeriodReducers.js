import {
    AVAILABLE_WORKING_PERIOD_FAIL,
    AVAILABLE_WORKING_PERIOD_LIST_REQUEST,
    AVAILABLE_WORKING_PERIOD_LIST_SUCCESS, AVAILABLE_WORKING_PERIOD_RESET
} from "../constants/workingPeriodConstants";

export const availableWorkingPeriodListReducer = (
    state = {loading: true, availableWorkingPeriods: []},
    action
) => {
    switch (action.type) {
        case AVAILABLE_WORKING_PERIOD_LIST_REQUEST:
            return {loading: true};
        case AVAILABLE_WORKING_PERIOD_LIST_SUCCESS:
            return {loading: false, availableWorkingPeriods: action.payload};
        case AVAILABLE_WORKING_PERIOD_FAIL:
            return {loading: false, error: action.payload};
        case AVAILABLE_WORKING_PERIOD_RESET:
            return {}
        default:
            return state;
    }
};