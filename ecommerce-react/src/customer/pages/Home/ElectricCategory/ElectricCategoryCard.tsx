import React from "react";
import type { HomeCategory } from "../../../../types/HomeCategoryType";

function ElectricCategoryCard({ item }: { item: HomeCategory }) {
  return (
    <div className="flex flex-col gap-2 justify-center">
      <img className="object-contain h-10" src={item.image} alt="" />
      <h2 className="font-semibold text-sm text-center">{item.name}</h2>
    </div>
  );
}

export default ElectricCategoryCard;
