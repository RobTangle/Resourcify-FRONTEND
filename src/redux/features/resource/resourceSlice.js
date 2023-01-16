import { createSlice } from "@reduxjs/toolkit";

export const resourceSlice = createSlice({
  name: "resource",
  initialState: {
    renderized: [],
  },
  reducers: {
    setRenderized: (state, action) => {
      state.renderized = action.payload;
    },
  },
});

export const { setRenderized } = resourceSlice.actions;

export default resourceSlice.reducer;
