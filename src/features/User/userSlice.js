import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {},
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUser(state, action) {
            state.loading = true;
        },
        fetchUserSuccess(state, action) {
            state.loading = false;
            state.userInfo = action.payload;
        },
        fetchUserFailed(state, action) {
            state.loading = false;
        },
    },
});

// Actions
export const userActions = userSlice.actions;

// Selectors
export const selectLoading = (state) => state.user.loading;
export const selectUserInfo = (state) => state.user.userInfo;

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;
