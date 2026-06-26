import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useApppSelector } from "../../../State/store";

const DealCategoryTable = () => {
  const { customer } = useApppSelector((store) => store);
  return (
    <div>
      <HomeCategoryTable data={customer.homePageData?.dealCategories || []} />
    </div>
  );
};

export default DealCategoryTable;
