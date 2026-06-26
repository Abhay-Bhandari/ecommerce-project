import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useApppSelector } from "../../../State/store";

function ShopByCategoryTable() {
  const { customer } = useApppSelector((store) => store);
  return (
    <div>
      <HomeCategoryTable data={customer.homePageData?.shopByCategories || []} />
    </div>
  );
}

export default ShopByCategoryTable;
