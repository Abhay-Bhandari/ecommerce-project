import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import { useFormik } from "formik";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (value: number) => () => {
    if (activeStep < steps.length - 1 || (activeStep > 0 && value == -1)) {
      setActiveStep(activeStep + value);
    }
    if (activeStep == steps.length - 1) {
      handleCreateAccount();
    }
  };

  const handleCreateAccount = () => {
    console.log("Create Account");
  };

  const formik = useFormik({
    initialValues: {
      mobile: "",
      gstin: "",
      otp: "",
      pickupAddress: {
        name: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        locality: "",
      },
      bankDetails: {
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
      },
      sellerName: "",
      email: "",
      bussinessDetails: {
        bussinessName: "",
        bussinessEmail: "",
        bussinessMobile: "",
        logo: "",
        banner: "",
        bussinessAddress: "",
      },
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // dispatchEvent(createSeller(formik.values))
    },
  });

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section className="mt-15 space-y-10">
        <div>
          {activeStep === 0 ? (
            <BecomeSellerFormStep1 formik={formik} />
          ) : activeStep === 1 ? (
            <BecomeSellerFormStep2 formik={formik} />
          ) : activeStep === 2 ? (
            <BecomeSellerFormStep3 formik={formik} />
          ) : (
            <BecomeSellerFormStep4 formik={formik} />
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleStep(-1)}
          >
            Back
          </Button>
          <Button onClick={handleStep(1)} variant="contained">
            {activeStep === steps.length - 1 ? "CONTINUE" : "Next"}
          </Button>
        </div>
      </section>
    </div>
  );
};
export default SellerAccountForm;
