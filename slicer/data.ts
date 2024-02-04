import { createSlice } from "@reduxjs/toolkit";

export interface DataState {
  business: "total" | string;
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
  },
});

export const { setBusiness } = DataSlice.actions;
