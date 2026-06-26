import type { CartItem } from "../types/CartType";

export const sumCartItemMrpPrice = (cartItems:CartItem[])=>{
  return cartItems.reduce((total, item) => total + item.mrpPrice * item.quantity, 0);
}