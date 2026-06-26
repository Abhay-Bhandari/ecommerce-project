import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderItem, OrderState } from "../../types/OrderTypes";
import { api } from "../../config/Api";
import type { Address } from "../../types/UserTypes";
import axios from "axios";

const initialState: OrderState = {
  orders: [],
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
  loading: false,
  error: null,
  orderCanceled: false,
};

const API_URL =  "/api/orders";

export const fetchUserOrderHistory = createAsyncThunk<Order[], string>("order/fetchUserOrderHistory", async (jwt, {rejectWithValue}) => {
  try{
    const response = await api.get<Order[]>(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    console.log("order history fetched", response.data)
    return response.data
  }catch(error:any){
    console.log(error)
    return rejectWithValue(error.response.data.error)
  }
});

export const fetchOrderById = createAsyncThunk<Order, {orderId: number; jwt: string}>("orders/fetchOrderById", async ({orderId, jwt}, {rejectWithValue}) => {
  try{
    const response = await api.get<Order>(`${API_URL}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    console.log("order fetched", response.data)
    return response.data
  }catch(error:any){
    console.log(error)
    return rejectWithValue(error.response.data.error)
  }
})

export const createOrder = createAsyncThunk<any, {address: Address ; jwt: string, paymentGateway: string}>("orders/createOrder", async ({address, jwt, paymentGateway}, {rejectWithValue}) => {
  try{
    const response = await api.post(`${API_URL}`,address, {
      headers: {Authorization: `Bearer ${jwt}`},
      params:{paymentGateway: paymentGateway}
    })

    console.log("order created", response.data);
    if(response.data.payment_link_url){
      window.location.href = response.data.payment_link_url;
    }
    return response.data;
  }catch(error:any){
    console.log(error.response)
    return rejectWithValue(error.response.data.error)
  }
})

export const fetchOrderItemById = createAsyncThunk<OrderItem, {orderItemId: number; jwt: string}>("orders/fetchOrderItemById", async ({orderItemId, jwt}, {rejectWithValue}) => {
  try{
    const response = await api.get(`${API_URL}/item/${orderItemId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    console.log("order item fetched", response.data)
    return response.data
  }catch(error:any){
    console.log(error)
    return rejectWithValue(error.response.data.error)
  }
})


export const paymentSuccess = createAsyncThunk<any, { jwt: string; paymentId: string; paymentLinkId: string}, {rejectValue: string}>("orders/paymentSuccess", async ({jwt, paymentId, paymentLinkId}, {rejectWithValue}) => { 
  try{
    const response = await api.post(`/api/payment/${paymentId}`, {
      headers: {Authorization: `Bearer ${jwt}`},
      params: {paymentLinkId}
    })

    console.log("payment success", response.data)
    return response.data
  }catch(error:any){
    console.log(error)
    return rejectWithValue("Failed to process payment")
  }
})


export const cancelOrder = createAsyncThunk<Order, any>('orders/cancelOrder', async (orderId, {rejectWithValue}) => {
  try{
    const response = await api.put(`${API_URL}/${orderId}/cancel`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })

    console.log("order canceled", response.data)
    return response.data
  }catch(error:any){
    console.log(error)
    if(axios.isAxiosError(error) && error.response?.data?.error){
      return rejectWithValue(error.response?.data?.error)
    }
    return rejectWithValue("Failed to cancel order")
  }
})

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(fetchUserOrderHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.orderCanceled = false;
    })
    .addCase(fetchUserOrderHistory.fulfilled, (state, action:PayloadAction<Order[]>) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(fetchUserOrderHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(fetchOrderById.pending, (state)=>{
      state.loading = true;
      state.error = null;
    })

    .addCase(fetchOrderById.fulfilled, (state, action:PayloadAction<Order>)=>{
      state.loading = false;
      state.currentOrder = action.payload;
    })

    .addCase(fetchOrderById.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(fetchOrderItemById.pending, (state)=>{
      state.loading = true;
      state.error = null;
    })
    

    .addCase(fetchOrderItemById.fulfilled, (state, action)=>{
      state.loading = false;
      state.orderItem = action.payload;
    })

    .addCase(fetchOrderItemById.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(createOrder.pending, (state)=>{
      state.loading = true;
      state.error = null;
    })

    .addCase(createOrder.fulfilled, (state, action:PayloadAction<any>)=>{
      state.paymentOrder = action.payload;
      state.loading = false;
    })

    .addCase(createOrder.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(paymentSuccess.pending, (state)=>{
      state.loading = true;
      state.error = null;
    })

    .addCase(paymentSuccess.fulfilled, (state, action)=>{
      state.loading = false;
      console.log("Payment Succesful", action.payload);
    })

    .addCase(paymentSuccess.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(cancelOrder.pending, (state)=>{
      state.loading = true;
      state.error = null;
      state.orderCanceled = false;
    })

    .addCase(cancelOrder.fulfilled, (state, action)=>{
      state.loading = false;
      state.orderCanceled = true;
      state.orders = state.orders.map((order)=>order.id === action.payload.id ? action.payload : order);
      state.currentOrder = action.payload;
    })

    .addCase(cancelOrder.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload as string;
    })
  }

})
  

export default orderSlice.reducer;