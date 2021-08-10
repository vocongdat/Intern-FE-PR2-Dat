import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    logging: false,
    currentUser: {},
    loginFailed: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.logging = true;
        },
        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload.body;
            state.loginFailed = false;
        },
        loginFailed(state) {
            state.logging = false;
            state.loginFailed = true;
        },

        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = {};
            state.loginFailed = false;
        },
    },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectLoginFailed = (state) => state.auth.loginFailed;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
