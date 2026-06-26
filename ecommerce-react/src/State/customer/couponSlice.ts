import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart } from "../../types/CartType";
import { api } from "../../config/Api";
import type { CouponState } from "../../types/CouponTypes";

const API_URL = "/api/coupon";

export const applyCoupon = createAsyncThunk<
  Cart,
  {
    apply: string;
    code: string;
    orderValue: number;
    jwt: string;
  },
  { rejectValue: string }
>("coupon/applyCoupon",
  async ({ apply, code, orderValue, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/apply`, null, {
        params: {
          apply,
          code,
          orderValue,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Coupon applied:", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Coupon error:", error);

      // If server sends detailed error:
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      }

      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const initialState: CouponState = {
  coupons: [],
  cart: null,
  loading: false,
  error: null,
  couponCreated: false,
  couponApplied: false,
}

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.couponApplied = false;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;

        if(action.meta.arg.apply === "true"){
          state.couponApplied = true;
        }
      })
      .addCase(applyCoupon.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to apply coupon";
        state.couponApplied = false;
      });
  },
});

export default couponSlice.reducer;

