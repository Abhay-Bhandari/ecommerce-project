import React from "react";
import type { Product } from "../../types/ProductType";
import { addProductToWishlist } from "../../State/customer/wishlistSlice";
import { useAppDispatch } from "../../State/store";
import { teal } from "@mui/material/colors";
import { Close } from "@mui/icons-material";

const WishlistProductCard = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();

  const handleWishlist = () => {
    if (item.id) {
      dispatch(addProductToWishlist({ productId: item.id }));
    }
  };

  return (
    <div className="w-60 relative">
      <div className="w-full">
        <img src={item.images[0]} alt="" className="object-top w-full" />
      </div>
      <div className="pt-3 space-y-1">
        <p>{item.title}</p>

        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">₹ {item.sellingPrice}</span>
          <span className="thin-line-through text-gray-400">
            ₹ {item.mrpPrice}
          </span>
          <span className="text-primary-color font-semibold">
            {item.discountPercent}%
          </span>
        </div>
      </div>

      <div className="absolute top-1 right-1">
        <button onClick={handleWishlist}>
          <Close
            className="cursor-pointer bg-white rounded-full p-1"
            sx={{ color: teal[500] }}
          />
        </button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
