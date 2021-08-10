import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    list: [],
    listTrash: [],
    users: [],
    cartList: [],
    filter: {
        _page: 1,
        _limit: 20,
        deletedAt_ne: true,
        _order: 'desc',
        _sort: 'createdAt',
    },
    pagination: {
        _page: 1,
        _limit: 20,
        _totalRows: 20,
    },
    filterTrash: {
        _page: 1,
        _limit: 20,
        deletedAt_ne: false,
        _order: 'desc',
        _sort: 'createdAt',
    },
    paginationTrash: {
        _page: 1,
        _limit: 20,
        _totalRows: 20,
    },
    category: [],
    vegetableByID: {},
    cartCheckoutList: [],
};

const managementSlice = createSlice({
    name: 'management',
    initialState,
    reducers: {
        fetchListProduct(state) {
            state.loading = true;
        },

        fetchListProductSuccess(state, action) {
            state.loading = false;
            state.list = action.payload.body;
            state.pagination = action.payload.pagination;
        },

        fetchListProductFailed(state) {
            state.loading = false;
        },

        fetchListTrashProduct(state) {
            state.loading = true;
        },

        fetchListTrashProductSuccess(state, action) {
            state.loading = false;
            state.listTrash = action.payload.body;
            state.paginationTrash = action.payload.pagination;
        },

        fetchListTrashProductFailed(state) {
            state.loading = false;
        },

        fetchCategoryList(state) {
            state.loading = true;
        },

        fetchCategoryListSuccess(state, action) {
            state.category = action.payload.body;
            state.loading = false;
        },

        fetchCategoryListFailed(state) {
            state.loading = true;
        },

        fetchUser(state) {
            state.loading = true;
        },

        fetchUserSuccess(state, action) {
            state.loading = false;
            state.users = action.payload.body;
        },

        fetchUserFailed(state) {
            state.loading = false;
        },

        fetchCartList(state) {
            state.loading = true;
        },

        fetchCartListSuccess(state, action) {
            state.loading = false;
            state.cartList = action.payload.body;
        },

        fetchCartListFailed(state) {
            state.loading = false;
        },

        setFilter(state, action) {
            state.filter = action.payload;
        },

        setFilterTrash(state, action) {
            state.filterTrash = action.payload;
        },

        setFilterWithDebounce(state, action) {},

        fetchProductId(state) {
            state.loading = true;
        },

        fetchProductIdSuccess(state, action) {
            state.loading = false;
            state.vegetableByID = action.payload.body;
        },

        fetchProductIdFailed(state) {
            state.loading = false;
        },

        fetchCartCheckout(state) {
            state.loading = true;
        },

        fetchCartCheckoutSuccess(state, action) {
            state.loading = false;
            state.cartCheckoutList = action.payload.body;
        },

        fetchCartCheckoutFailed(state) {
            state.loading = false;
        },
    },
});

const { actions, reducer } = managementSlice;

// Actions
export const managementActions = actions;

// Selectors
export const selectManagementLoading = (state) => state.management.loading;
export const selectProductList = (state) => state.management.list;
export const selectProductListFilter = (state) => state.management.filter;
export const selectProductListPagination = (state) => state.management.pagination;
export const selectProductTrashList = (state) => state.management.listTrash;
export const selectProductTrashListFilter = (state) => state.management.filterTrash;
export const selectProductTrashListPagination = (state) => state.management.paginationTrash;
export const selectUser = (state) => state.management.users;
export const selectCartList = (state) => state.management.cartList;
export const selectCategoryListList = (state) => state.management.category;
export const selectProductById = (state) => state.management.vegetableByID;
export const selectCartCheckout = (state) => state.management.cartCheckoutList;

// Reducer
const managementReducer = reducer;

export default managementReducer;
