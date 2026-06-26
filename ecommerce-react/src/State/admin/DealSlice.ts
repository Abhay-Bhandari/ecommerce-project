import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../config/Api"

export const getAllDeals = createAsyncThunk("deals/getAllDeals", async(_, {rejectWithValue})=>{
  try {
    const response = await api.get("/admin/deals", {
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("jwt")}`
      }
    })
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to create deal")
    
  }
})



interface DealState {
  deals: any[];
  loading: boolean;
  error: any;
}

const initialState: DealState = {
  deals: [],
  loading: false,
  error: null
};

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(getAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default dealSlice.reducer;
