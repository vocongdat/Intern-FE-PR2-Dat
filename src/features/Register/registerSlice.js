import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        register(state, action) {
            state.loading = true;
        },
        registerSuccess(state, action) {
            state.loading = false;
        },
    },
});

// Actions
export const registerActions = registerSlice.actions;

// Selector
export const selectorLoading = (state) => state.register.loading;

// Reducer
const registerReducer = registerSlice.reducer;
export default registerReducer;
