import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    cartList: [],
    cartInfo: {},
    checkoutList: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        fetchCartList(state) {
            state.loading = true;
        },
        fetchCartListSuccess(state, action) {
            state.loading = false;
            state.cartList = action.payload;
        },
        fetchCartListFailed(state) {
            state.loading = false;
        },

        fetchCartById(state) {
            state.loading = true;
        },
        fetchCartByIdSuccess(state, action) {
            state.loading = false;
            state.cartInfo = action.payload;
        },
        fetchCartByIdFailed(state) {
            state.loading = false;
        },

        fetchCheckoutByUser(state) {
            state.loading = true;
        },

        fetchCheckoutByUserSuccess(state, action) {
            state.loading = false;
            state.checkoutList = action.payload;
        },

        fetchCheckoutByUserFailed(state) {
            state.loading = false;
        },

        updateCart(state, action) {},
    },
});

// Actions
export const cartActions = cartSlice.actions;

// Selectors
export const selectLoading = (state) => state.cart.loading;
export const selectCartList = (state) => state.cart.cartList;
export const selectCartInfo = (state) => state.cart.cartInfo;
export const selectCheckoutList = (state) => state.cart.checkoutList;

// Reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;
