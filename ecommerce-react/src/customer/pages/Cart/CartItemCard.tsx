import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import React from "react";
import type { CartItem } from "../../../types/CartType";
import { useAppDispatch } from "../../../State/store";
import { updateCartItem } from "../../../State/customer/cartSlice";
import { useNavigate } from "react-router";

const CartItemCard = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUpdateQuantity = (value: number) => () => {
    dispatch(
      updateCartItem({
        jwt: localStorage.getItem("jwt"),
        cartItemId: item.id,
        cartItem: { quantity: item.quantity + value },
      }),
    );
  };

  return (
    <div className="border border-gray-200 rounded-md relative">
      <div className="p-5 flex gap-3">
        <div>
          <img
            className="w-[90px] rounded-md"
            src={item.product.images[0]}
            alt=""
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">
            {item.product.seller?.businessDetails.businessName}
          </h1>
          <p className="text-gray-600 font-medium text-sm">
            {item.product.title}
          </p>

          <p className="text-gray-400 text-sm">
            <strong>Sold by : </strong>
            {item.product.seller?.businessDetails.businessName}
          </p>
          <p>7 days replacement available</p>
          <p className="text-sm text-gray-500">
            <strong>quantity : </strong> {item.quantity}
          </p>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between items-center">
        <div className="px-5 py-2 flex justify-between items-center">
          <div className="felx items-center gap-2 w-[140px] justify-between">
            <Button size="small" variant="contained" sx={{ bgcolor: "gray" }}>
              <Button
                onClick={handleUpdateQuantity(-1)}
                disabled={item.quantity === 1}
              >
                <Remove />
              </Button>
              <span>{item.quantity}</span>
              <Button onClick={handleUpdateQuantity(1)}>
                <Add />
              </Button>
            </Button>
          </div>
        </div>
        <div className="pr-5">
          <p className="text-gray-700 font-medium">₹{item.sellingPrice}</p>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <IconButton color="primary">
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItemCard;
