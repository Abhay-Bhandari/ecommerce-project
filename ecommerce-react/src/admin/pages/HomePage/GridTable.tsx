import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useApppSelector } from "../../../State/store";

function GridTable() {
  const { customer } = useApppSelector((store) => store);
  return (
    <div>
      <HomeCategoryTable data={customer.homePageData?.grid || []} />
    </div>
  );
}

export default GridTable;
