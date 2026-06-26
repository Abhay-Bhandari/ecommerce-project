import type { CartItem } from "../types/CartType";

export const sumCartItemSellingPrice = (cartItems:CartItem[])=>{
  return cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
}