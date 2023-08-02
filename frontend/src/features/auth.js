import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        setStates: (state, action) => {
            console.log(action);
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
            state.user = jwt_decode(action.payload.access);
            state.isAuthenticated = true;
        },
        removeStates: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setStates, removeStates } = authSlice.actions;
export default authSlice.reducer;
