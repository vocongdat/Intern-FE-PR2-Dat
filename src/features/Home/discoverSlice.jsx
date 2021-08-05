import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    trendingVegetable: [],
    newVegetable: [],
    bestSellerVegetable: [],
};

const discoverSlice = createSlice({
    name: 'discover',
    initialState,
    reducers: {
        fetchVegetableDiscover(state) {
            state.loading = true;
        },

        fetchVegetableTrendingSuccess(state, action) {
            state.trendingVegetable = action.payload.body;
        },

        fetchVegetableNewSuccess(state, action) {
            state.newVegetable = action.payload.body;
        },

        fetchVegetableBestSellerSuccess(state, action) {
            state.bestSellerVegetable = action.payload.body;
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
export const selectTrendingVegetable = (state) =>
    state.discover.trendingVegetable;

export const selectNewVegetable = (state) => state.discover.newVegetable;

export const selectBestSellerVegetable = (state) =>
    state.discover.bestSellerVegetable;

// Reducer
const discoverReducer = reducer;

export default discoverReducer;
