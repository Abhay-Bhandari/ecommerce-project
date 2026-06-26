import { Button, dividerClasses } from "@mui/material";
import React, { useState } from "react";
import DealCategoryTable from "./DealCategoryTable";
import DealTable from "./DealTable";
import CreateDealForm from "./CreateDealForm";

const tabs = ["Deals", "Category", "Create Deal"];

function Deal() {
  const [activeTab, setActiveTab] = useState("Deals");

  return (
    <div>
      <div className="flex gap-4 ">
        {tabs.map((item) => (
          <Button
            variant={activeTab == item ? "contained" : "outlined"}
            onClick={() => {
              setActiveTab(item);
            }}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="">
        {activeTab == "Deals" ? (
          <DealTable />
        ) : activeTab == "Category" ? (
          <DealCategoryTable />
        ) : (
          <div className="mt-5 flex flex-col justify-center items-center h-[70vh]">
            <CreateDealForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default Deal;
