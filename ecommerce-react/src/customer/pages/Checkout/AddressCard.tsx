import { Radio } from "@mui/material";
import React from "react";

function AddressCard() {
  const handleChange = (event: any) => {
    console.log(event.target.value);
  };
  return (
    <div className="p-5 border border-gray-300 rounded-md flex">
      <div>
        <Radio
          checked={true}
          onChange={handleChange}
          value=""
          name="radio-button"
        />
      </div>
      <div className="space-y-3 pt-3">
        <h1>ShipSite</h1>
        <p className="w-[320px] ">123 Main St, Anytown, USA 12345</p>
      </div>
    </div>
  );
}

export default AddressCard;
