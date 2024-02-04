import { createSlice } from "@reduxjs/toolkit";

export interface DataState {
  business: "total" | string;
  timeRange: "currentMonth" | "3months";
}

export const DataSlice = createSlice({
  name: "DataSlice",
  initialState: {
    business: "total",
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
