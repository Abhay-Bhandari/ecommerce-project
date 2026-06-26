import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useApppSelector } from "../../../State/store";

function ElectronicTable() {
  const { customer } = useApppSelector((store) => store);
  return (
    <div>
      <HomeCategoryTable
        data={customer.homePageData?.electricCategories || []}
      />
    </div>
  );
}

export default ElectronicTable;
