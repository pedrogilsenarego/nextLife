import { createSlice } from "@reduxjs/toolkit";

export interface DataState {
  business: "total" | string;
  timeRange: "currentMonth" | "6months";
}

export const DataSlice = createSlice({
  name: "DataSlice",
  initialState: {
    business: "total",
    timeRange: "currentMonth",
  } as DataState,
  reducers: {
    setBusiness: (state, action) => {
      state.business = action.payload;
    },
    setTimeRange: (state, action) => {
      state.timeRange = action.payload;
    },
  },
});

export const { setBusiness, setTimeRange } = DataSlice.actions;
