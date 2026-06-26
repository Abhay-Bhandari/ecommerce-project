import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderStatus } from "../../types/OrderTypes";
import { api } from "../../config/Api";

interface SellerOrderState{
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: SellerOrderState = {
  orders: [],
  loading: false,
  error: null,
}

export const fetchSellerOrders = createAsyncThunk<Order[], string>('sellerOrders/fetchSellerOrders', async (jwt, {rejectWithValue}) => {
  try {
    const response = await api.get(`/api/seller/orders`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("fetch seller Orders", response.data);
    return response.data;
  } catch (error) {
    console.log("fetch seller Orders error", error);
    return rejectWithValue(error as string);
  }
})

export const updateOrderStatus =  createAsyncThunk<Order, {jwt: string, orderId: number, orderStatus: OrderStatus}>('sellerOrders/updateOrderStatus', async ({jwt, orderId, orderStatus}, {rejectWithValue}) => {
  try {
    const response = await api.put(`/api/seller/orders/${orderId}/status/${orderStatus}`,null, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("update order status", response.data);
    return response.data;
  } catch (error) {
    console.log("update order status error", error);
    return rejectWithValue(error as string);
  }
})

export const deleteOrder = createAsyncThunk<any, {jwt: string, orderId: number}>('sellerOrders/deleteOrder', async ({jwt, orderId}, {rejectWithValue}) => {
  try {
    const response = await api.delete(`/api/seller/orders/${orderId}/delete`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("delete order", response.data);
    return response.data;
  } catch (error) {
    console.log("delete order error", error);
    return rejectWithValue(error as string);
  }
})


const sellerOrderSlice = createSlice({
  name: "sellerOrders",
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellerOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSellerOrders.fulfilled, (state, action:PayloadAction<Order[]>) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(fetchSellerOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(updateOrderStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateOrderStatus.fulfilled, (state, action:PayloadAction<Order>) => {
      state.loading = false;
      const index = state.orders.findIndex(order=> order.id === action.payload.id);
      if(index !== -1){
        state.orders[index] = action.payload;
      }
    })
    .addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(deleteOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteOrder.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.orders.filter(order=> order.id !== action.meta.arg.orderId );
      
    })
    .addCase(deleteOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
  }})

export default sellerOrderSlice.reducer