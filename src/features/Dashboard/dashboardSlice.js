import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    list: [],
    highestViewedList: [],
    lowestViewedList: [],
    highestSoldList: [],
    lowestSoldList: [],
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchDashboardData(state) {
            state.loading = true;
        },
        fetchDataSuccess(state) {
            state.loading = false;
        },
        fetchDataFailed(state) {
            state.loading = false;
        },

        setList(state, action) {
            state.list = action.payload;
        },

        setHighestViewedList(state, action) {
            state.highestViewedList = action.payload;
        },
        setLowestViewedList(state, action) {
            state.lowestViewedList = action.payload;
        },
        setHighestSoldList(state, action) {
            state.highestSoldList = action.payload;
        },
        setLowestSoldList(state, action) {
            state.lowestSoldList = action.payload;
        },
    },
});

const { actions, reducer } = dashboardSlice;

// Actions
export const dashboardActions = actions;

// Selectors
export const selectDashboardList = (state) => state.dashboard.list;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectHighestViewedList = (state) => state.dashboard.highestViewedList;
export const selectLowestViewedList = (state) => state.dashboard.lowestViewedList;
export const selectHighestSoldList = (state) => state.dashboard.highestSoldList;
export const selectLowestSoldList = (state) => state.dashboard.lowestSoldList;

// Reducer
const dashboardReducer = reducer;

export default dashboardReducer;
