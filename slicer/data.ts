import { createSlice } from "@reduxjs/toolkit";

export interface DataState {
  business: "total" | string;
  timeRange: {
    startDate: Date;
    endDate: Date;
  };
}

const currentDate = new Date();
const firstDayOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  1
);
const lastDayOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
);

export const DataSlice = createSlice({
  name: "DataSlice",
  initialState: {
    business: "total",
    timeRange: {
      startDate: firstDayOfMonth,
      endDate: lastDayOfMonth,
    },
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
