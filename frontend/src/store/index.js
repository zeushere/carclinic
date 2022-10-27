import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../slices/auth-slice";
import userSlice from "../slices/user-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer
    }
});

export default store;