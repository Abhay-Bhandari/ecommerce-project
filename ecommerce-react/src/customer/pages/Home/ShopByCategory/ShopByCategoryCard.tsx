import React from "react";
import "./ShopByCategory.css";
import type { HomeCategory } from "../../../../types/HomeCategoryType";

function ShopByCategoryCard({ item }: { item: HomeCategory }) {
  return (
    <div className="flex gap-3 flex-col justify-center items-center group coursor-pointer">
      <div className="custom-border w-[150px] h-[150px] lg:w-[249px] lg:h-[249px] rounded-full bg-primary-color">
        <img
          className="rounded-full group-hover:scale-95 transition-transform transform-duration-700 object-cover object-top h-full w-full "
          src={item.image}
          alt=""
        />
      </div>
      <h1>{item.name}</h1>
    </div>
  );
}

export default ShopByCategoryCard;
