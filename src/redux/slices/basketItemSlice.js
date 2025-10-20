import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const basketItemSlice = createSlice({
  name: "basketItems",
  initialState,
  reducers: {
    addItem(state, action) {
      state.push(action.payload); // просто пушим в массив
    },
    removeItem(state, action) {
      return state.filter(item => item !== action.payload); // удаляем по id
    },
  },
});

export const { addItem, removeItem } = basketItemSlice.actions;
export default basketItemSlice.reducer;
