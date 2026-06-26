import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import type { Product } from "../../types/ProductType";

export const fetchSellerProduct = createAsyncThunk<Product[], any>(
  "/sellerProduct/fetchSellerProduct",
  async (jwt, {rejectWithValue}) => {
    try{
      const response = await api.get("/sellers/products",{
        headers:{
          Authorization: `Bearer ${jwt}`
        }
      })
      const data = response.data;
      console.log("fetch seller product", response.data)
      return response.data;

    }catch(error){
      console.log("error ---" , error);
      throw error;
    }
    } 
)

export const createProduct = createAsyncThunk<Product, {request:any, jwt:string|null}>(
  "/sellerProduct/createProduct",
  async (args, {rejectWithValue}) => {
    const {request,jwt} = args;
    try{
      const response = await api.post("/sellers/products",request,{
        headers:{
          Authorization: `Bearer ${jwt}`
        }
      })
      console.log("create product", response.data)
      return response.data;

    }catch(error){
      console.log("error ---" , error);
      throw error;
    }
    } 
)

interface SellerProductState{
  products:Product[],
  loading:boolean,
  error:any|string |undefined
}

const initialState:SellerProductState={
  products:[],
  loading:false,
  error:null
}

const sellerProductSlice = createSlice({
  name:"sellerProduct",
  initialState,
  reducers:{},
  extraReducers:(builder) =>{
    builder.addCase(fetchSellerProduct.pending,(state)=>{
      state.loading=true
    })
    .addCase(fetchSellerProduct.fulfilled,(state,action)=>{
      state.loading=false
      state.products=action.payload
    })
    .addCase(fetchSellerProduct.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })
    builder.addCase(createProduct.pending,(state)=>{
      state.loading=true
    })
    .addCase(createProduct.fulfilled,(state,action)=>{
      state.loading=false
      state.products.push(action.payload)
    })
    .addCase(createProduct.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
})

export default sellerProductSlice.reducer