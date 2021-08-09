import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    list: [],
    isClear: false,
    filter: {
        _page: 1,
        _limit: 12,
        deletedAt_ne: true,
    },
    pagination: {
        _page: 1,
        _limit: 12,
        _totalRows: 12,
    },
    category: [],
    vegetableByID: {},
    comments: [],
    favorite: [],
};

const vegetableSlice = createSlice({
    name: 'vegetable',
    initialState,
    reducers: {
        fetchVegetableList(state) {
            state.loading = true;
        },
        fetchVegetableListSuccess(state, action) {
            state.list = action.payload.body;
            state.pagination = action.payload.pagination;
            state.loading = false;
        },
        fetchVegetableListFailed(state) {
            state.loading = true;
        },

        setFilter(state, action) {
            state.filter = action.payload;
            state.isClear = true;
        },

        setClearFilter(state, action) {
            state.filter = action.payload;
            state.isClear = false;
        },

        fetchCategory(state) {
            state.loading = true;
        },
        fetchCategorySuccess(state, action) {
            state.category = action.payload.body;
        },
        fetchCategoryFailed(state) {
            state.loading = false;
        },

        fetchVegetableById(state) {
            state.loading = true;
        },
        fetchVegetableByIdSuccess(state, action) {
            state.vegetableByID = action.payload.body;
            state.loading = false;
        },
        fetchVegetableByIdFailed(state) {
            state.loading = true;
        },

        fetchFavoriteListByUser(state) {
            state.loading = true;
        },
        fetchFavoriteListByUserSuccess(state, action) {
            state.favorite = action.payload.body;
            state.loading = false;
        },
        fetchFavoriteListByUserFailed(state) {
            state.loading = true;
        },

        setComment(state, action) {
            state.comments = action.payload.body;
        },

        setFilterWithDebounce(state, action) {},
    },
});

const { actions, reducer } = vegetableSlice;

// Actions
export const vegetableActions = actions;

// Selectors
export const selectVegetableList = (state) => state.vegetable.list;
export const selectVegetableLoading = (state) => state.vegetable.loading;
export const selectVegetableFilter = (state) => state.vegetable.filter;
export const selectVegetablePagination = (state) => state.vegetable.pagination;
export const selectCategories = (state) => state.vegetable.category;
export const selectVegetableById = (state) => state.vegetable.vegetableByID;
export const selectClear = (state) => state.vegetable.isClear;
export const selectComment = (state) => state.vegetable.comments;
export const selectFavorite = (state) => state.vegetable.favorite;

// Reducer
const vegetableReducer = reducer;

export default vegetableReducer;
