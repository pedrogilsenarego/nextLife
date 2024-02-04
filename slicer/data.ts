import { createSlice } from "@reduxjs/toolkit";
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

export interface DataState {
  business: "total" | string;
  timeRange: { id: "currentMonth" | "6months"; startTime: Date; endDate: Date };
}

export const DataSlice = createSlice({
  name: "DataSlice",
  initialState: {
    business: "total",
    timeRange: {
      id: "currentMonth",
      startTime: firstDayOfMonth,
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
