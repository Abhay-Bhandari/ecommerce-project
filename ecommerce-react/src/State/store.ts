import {configureStore} from "@reduxjs/toolkit" 
import { combineReducers } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import sellerSlice from "./seller/sellerSlice"
import sellerProductSlice from "./seller/sellerProductSlice"
import productSlice from "./customer/ProductSlice"
import authSlice from "./AuthSlice"
import cartSlice from "./customer/cartSlice"
import orderSlice from "./customer/orderSlice"
import wishlistSlice from "./customer/wishlistSlice"
import sellerOrderSlice from "./seller/sellerOrderSlice"
import transactionSlice from "./seller/transactionSlice"
import adminSlice from "./admin/adminSlice"
import customerSlice from "./customer/customerSlice"
import dealSlice from "./admin/DealSlice"

const rootReducer = combineReducers({
  seller:sellerSlice,
  sellerProduct:sellerProductSlice,
  product:productSlice ,
  auth:authSlice,
  cart:cartSlice,
  customer:customerSlice,
  order: orderSlice,
  wishlist: wishlistSlice,
  sellerOrders:sellerOrderSlice,
  transactions:transactionSlice,
  admin:adminSlice,
  deal:dealSlice
})

export const store = configureStore({
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()

 })

 export type AppDispatch = typeof store.dispatch
 export type RootState = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useApppSelector: TypedUseSelectorHook<RootState> = useSelector