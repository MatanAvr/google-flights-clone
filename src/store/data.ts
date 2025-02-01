import { createSlice } from "@reduxjs/toolkit";

const flightsDataInit: any = undefined;
const isLoadingFlightsInit: boolean = false;

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    flightsData: flightsDataInit,
    isLoadingFlights: isLoadingFlightsInit,
  },
  reducers: {
    setFlightsData: (state, action: { payload: { data: any } }) => {
      state.flightsData = action.payload.data;
    },
    setIsLoadingFlights: (
      state,
      action: { payload: { isLoading: boolean } }
    ) => {
      state.isLoadingFlights = action.payload.isLoading;
    },
  },
});

export const { setFlightsData, setIsLoadingFlights } = dataSlice.actions;

export default dataSlice.reducer;
