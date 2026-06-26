import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Order } from "../../types/OrderTypes";
import type { Seller } from "../../types/SellerTypes";
import type { User } from "../../types/UserTypes";
import { api } from "../../config/Api";

export interface Transaction {
    id: number;
    order: Order;
    customer: User;
    seller: Seller;
    date: string;
}

interface TransactionState {
    transactions: Transaction[] ;
    transaction: Transaction | null;
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    transactions: [],
    transaction: null,
    loading: false,
    error: null,
}

export const fetchTransactionsBySeller = createAsyncThunk<Transaction[], string, {rejectValue: string}>('transactions/fetchTransactionsBySeller', async (jwt: string, {rejectWithValue}) => {
    try {
        const response = await api.get('/api/transactions/seller', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log("fetchTransactionBySeller", response.data)
        return response.data
    } catch (error:any) {
        if(error.response){
          return rejectWithValue(error.response.data.message) 
        }
        return rejectWithValue("Failed to fetch transactions")
    }
})

const transactionSlice = createSlice({
  name: 'transactions',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactionsBySeller.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchTransactionsBySeller.fulfilled, (state, action) => {
      state.loading = false
      state.transactions = action.payload
    })
    builder.addCase(fetchTransactionsBySeller.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string  
    })
  }
})

export default transactionSlice.reducer