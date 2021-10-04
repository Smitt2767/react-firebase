import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  message: "",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setIsLoading, setMessage } = layoutSlice.actions;
export default layoutSlice.reducer;
