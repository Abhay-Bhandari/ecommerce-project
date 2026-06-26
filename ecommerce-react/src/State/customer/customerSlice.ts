import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { HomeCategory, HomeData } from "../../types/HomeCategoryType";
import { api } from "../../config/Api";

export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[]>(
  "home/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/categories", homeCategories);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

interface HomeState{
  homePageData: HomeData | null;
  loading: boolean;
  homeCategories: HomeCategory[] ;
  error: string | null;
}

const initialState: HomeState = {
  homePageData: null,
  loading: false,
  homeCategories: [],
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.homePageData = action.payload;
      })
      .addCase(createHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create home categories";
      });
  },
});

export default homeSlice.reducer;
