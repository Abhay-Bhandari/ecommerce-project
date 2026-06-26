import { Box } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const steps = [
  {
    name: "Order Placed",
    description: "on Mon, 08 Jul",
    value: "PLACED",
  },
  {
    name: "Packed",
    description: "on Tue, 09 Jul",
    value: "PACKED",
  },
  {
    name: "Order Shipped",
    description: "on Tue, 09 Jul",
    value: "SHIPPED",
  },
  {
    name: "Arrived at Destination Hub",
    description: "on Wed, 10 Jul",
    value: "ARRIVED",
  },
  {
    name: "Out for Delivery",
    description: "on Thu, 11 Jul",
    value: "OUT_FOR_DELIVERY",
  },
  {
    name: "Order Delivered",
    description: "on Thu, 11 Jul",
    value: "DELIVERED",
  },
];
const canceledSteps = [
  {
    name: "Order Placed",
    description: "on Mon, 08 Jul",
    value: "PLACED",
  },
  {
    name: "Order Cancelled",
    description: "on Tue, 09 Jul",
    value: "CANCELLED",
  },
];
const currentStep = 3;

const OrderStepper = ({ orderStatus }: any) => {
  const statusStep = orderStatus === "CANCELLED" ? canceledSteps : steps;

  return (
    <Box className="mx-auto my-10">
      {statusStep.map((step, index) => (
        <React.Fragment key={step.value}>
          <div className={`flex px-4`}>
            <div className="flex flex-col items-center">
              <Box
                sx={{ zIndex: -1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${index <= currentStep ? "bg-gray-200 text-teal-500" : "bg-gray-300 text-gray-600"}`}
              >
                {step.value === orderStatus ? (
                  <CheckCircleIcon />
                ) : (
                  <FiberManualRecordIcon sx={{ zIndex: -1 }} />
                )}
              </Box>
              {statusStep.length - 1 != index && (
                <div
                  className={`border h-20 w-[2px] ${index < currentStep ? "bg-primary-color" : "bg-gray-300 text-gray-600"}`}
                ></div>
              )}
            </div>
            <div className={`ml-2 w-full`}>
              <div
                className={`${step.value === orderStatus ? "bg-primary-color p-2 text-white font-medium rounded-md -translate-y-3" : ""} ${
                  orderStatus === "CANCELLED" && step.value === orderStatus
                    ? "bg-red-500"
                    : ""
                } w-full`}
              >
                <p className={``}>{step.name}</p>
                <p
                  className={`${step.value === orderStatus ? "text-gray-200" : "text-gray-500"} text-xs`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default OrderStepper;
