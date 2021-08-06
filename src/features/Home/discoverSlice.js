import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    discoverList: {
        trendingVegetable: [],
        newVegetable: [],
        bestSellerVegetable: [],
    },
};

const discoverSlice = createSlice({
    name: 'discover',
    initialState,
    reducers: {
        fetchVegetableDiscover(state) {
            state.loading = true;
        },
        fetchVegetableDiscoverSuccess(state, action) {
            state.loading = false;
            state.discoverList = action.payload;
        },
        fetchVegetableDiscoverFailed(state) {
            state.loading = false;
        },
    },
});

const { actions, reducer } = discoverSlice;

// Actions
export const discoverActions = actions;

// Selectors
export const selectDiscoverList = (state) => state.discover.discoverList;
export const selectLoadingDiscover = (state) => state.discover.loading;

// Reducer
const discoverReducer = reducer;

export default discoverReducer;
