import React from "react";
import ElectricCategoryCard from "./ElectricCategoryCard";
import { useApppSelector } from "../../../../State/store";

function ElectricCategory() {
  const { customer } = useApppSelector((store) => store);

  return (
    <div className="flex flex-wrap justify-between py-4 lg:px-20 border-b">
      {customer.homePageData?.electricCategories
        .slice(0, 7)
        .map((item: any) => (
          <ElectricCategoryCard item={item} />
        ))}
    </div>
  );
}

export default ElectricCategory;
