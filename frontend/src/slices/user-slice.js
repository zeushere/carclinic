import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo : []
    },
    reducers: {
        login(state,action){
            state.userInfo = action.payload.userInfo;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice;