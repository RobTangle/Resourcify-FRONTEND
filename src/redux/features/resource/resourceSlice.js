import { createSlice } from "@reduxjs/toolkit";

export const resourceSlice = createSlice({
  name: "resource",
  initialState: {
    renderized: [],
    filter: { categories: [], keywords: [], toggleAND: false },
  },
  reducers: {
    setRenderized: (state, action) => {
      state.renderized = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setRenderized, setFilter } = resourceSlice.actions;

export default resourceSlice.reducer;
