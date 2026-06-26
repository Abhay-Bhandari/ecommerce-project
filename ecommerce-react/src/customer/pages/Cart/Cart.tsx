import React, { useEffect, useState } from "react";
import { Close, LocalOffer } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { Button, dividerClasses, IconButton, TextField } from "@mui/material";
import PricingCart from "./PricingCart";
import { useNavigate } from "react-router";
import { useAppDispatch, useApppSelector } from "../../../State/store";
import { fetchUserCart } from "../../../State/customer/cartSlice";
import CartItemCard from "./CartItemCard";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const handleCoupon = (e: any) => {
    setCouponCode(e.target.value);
  };

  const dispatch = useAppDispatch();
  const { cart } = useApppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="cartItemSection lg:col-span-2 space-y-3">
          {cart.cart?.cartItems.map((item) => (
            <CartItemCard item={item} />
          ))}
        </div>
        <div className="col-span-1 text-sm space-y-3">
          <div className="border border-gray-200 rounded-md px-5 py-3 space-y-5">
            <div className="flex gap-3 text-sm items-center">
              <LocalOffer sx={{ color: teal[600], fontSize: "17px" }} />
              <span>Apply Coupon</span>
            </div>
            {couponCode ? (
              <div className="flex">
                <div className="p-1 pl-5 pr-3 border border-green-600 rounded-md flex gap-2 items-center">
                  <span>{couponCode}</span>
                  <IconButton size="small" onClick={() => setCouponCode("")}>
                    <Close className="text-red-600" />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <TextField
                  id="outlined-basic"
                  placeholder="coupon code"
                  size="small"
                  variant="outlined"
                  value={couponCode}
                  onChange={handleCoupon}
                />
                <Button size="small">
                  Apply
                </Button>
              </div>
            )}
          </div>
          <div className="border border-gray-200 rounded-md ">
            <PricingCart />
            <div className="p-5">
              <Button
                onClick={() => navigate("/checkout")}
                fullWidth
                variant="contained"
                sx={{ py: "11px" }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
