import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 12,
    },
    pagination: {
        _page: 1,
        _limit: 12,
        _totalRows: 12,
    },
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
            state.loading = false;
        },

        setFilter(state, action) {
            state.filter = action.payload;
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

// Reducer
const vegetableReducer = reducer;

export default vegetableReducer;
