import React from "react";
import ShopByCategoryCard from "./ShopByCategoryCard";
import { useAppDispatch, useApppSelector } from "../../../../State/store";

function ShopByCategory() {
  const { customer } = useApppSelector((store) => store);
  return (
    <>
      <div className="flex flex-wrap justify-between lg:px-20 gap-5">
        {customer.homePageData?.shopByCategories
          .slice(0, 10)
          .map((item: any) => (
            <ShopByCategoryCard item={item} />
          ))}
      </div>
    </>
  );
}

export default ShopByCategory;
