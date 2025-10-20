import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      return action.payload;
    },
  },
});

export const { setCategories, addCategory, removeCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
