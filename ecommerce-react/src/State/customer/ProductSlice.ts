import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../config/Api";
import type { Product } from "../../types/ProductType";

const API_URL = "/products"
export const fetchProductById = createAsyncThunk<any,any>("products/fetchProductById", async(productId, {rejectWithValue})=>{
  try{
    const response = await api.get(`${API_URL}/${productId}`);

    const data = response.data;
    console.log("product by id", data);
    return data;
  }catch(error:any){
    return rejectWithValue(error.message);
  }
}

)


export const searchProduct = createAsyncThunk("products/searchProduct", async(query, {rejectWithValue})=>{
  try{
    const response = await api.get(`${API_URL}/search`, {
      params:{
        query:query
      }
    });

    const data = response.data;
    console.log("search product", data);
    return data;
  }catch(error:any){
    return rejectWithValue(error.message);
  }
}

)

export const fetchAllProducts = createAsyncThunk<any,any>("products/fetchAllProducts", async(params, {rejectWithValue})=>{
  try{
    const response = await api.get(`${API_URL}`, {
      params:{
        ...params,
        pageNumber:params.pageNumber ||0
        
      }
    });

    const data = response.data;
    console.log("All product Data", data);
    return data;
  }catch(error:any){
    return rejectWithValue(error.message);
  }
}
)

interface ProductState{
  product: Product | null;
  proudcts: Product[];
  totalPages:number;
  searchProduct: Product[];
  loading:boolean;
  error:string | null | undefined | any;
}

const initialState:ProductState = {
  product:null,
  proudcts:[],
  totalPages:1,
  searchProduct:[],
  loading:false,
  error:null
}

const productSlice = createSlice({
  name:"products",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchProductById.pending,(state,)=>{
      state.loading = true;
    })
    .addCase(fetchProductById.fulfilled,(state,action)=>{
      state.loading = false;
      state.product = action.payload;
    })
    .addCase(fetchProductById.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    });

    builder
    .addCase(searchProduct.pending,(state,)=>{
      state.loading = true;
    })
    .addCase(searchProduct.fulfilled,(state,action)=>{
      state.loading = false;
      state.searchProduct = action.payload;
    })
    .addCase(searchProduct.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    });

    builder
    .addCase(fetchAllProducts.pending,(state,)=>{
      state.loading = true;
    })
    .addCase(fetchAllProducts.fulfilled,(state,action)=>{
      state.loading = false;
      state.proudcts = action.payload.content;
    })
    .addCase(fetchAllProducts.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })



    
  }
})

export default productSlice.reducer;



