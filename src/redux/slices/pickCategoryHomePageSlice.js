import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const pickCategoryHomePageSlice = createSlice({
  name: "pickCategories",
  initialState,
  reducers: {
    setPickCategories(state, action) {
      return action.payload;
    },
    // addCategory(state, action) {
    //   state.categories.push(action.payload);
    // },
    // removeCategory(state, action) {
    //   state.categories = state.categories.filter(cat => cat !== action.payload);
    // },
  },
});

export const { setPickCategories } = pickCategoryHomePageSlice.actions;
export default pickCategoryHomePageSlice.reducer;
