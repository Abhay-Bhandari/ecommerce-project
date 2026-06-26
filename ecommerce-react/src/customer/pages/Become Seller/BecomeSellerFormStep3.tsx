import { TextField } from "@mui/material";
import React from "react";

interface BecomeSellerFormStep2Props {
  formik: any;
}

const BecomeSellerFormStep3: React.FC<BecomeSellerFormStep2Props> = ({
  formik,
}) => {
  return (
    <div className="space-y-5">
      {/* Account Number */}
      <TextField
        fullWidth
        className="!mt-5"
        name="bankDetails.accountNumber"
        label="Account Number"
        value={formik.values.bankDetails.accountNumber}
        onChange={formik.handleChange}
        error={
          formik.touched.bankDetails?.accountNumber &&
          Boolean(formik.errors.bankDetails?.accountNumber)
        }
        helperText={
          formik.touched.bankDetails?.accountNumber &&
          formik.errors.bankDetails?.accountNumber
        }
      />

      {/* IFSC Code */}
      <TextField
        fullWidth
        className="!mt-5"
        name="bankDetails.ifscCode"
        label="IFSC Code"
        value={formik.values.bankDetails.ifscCode}
        onChange={formik.handleChange}
        error={
          formik.touched.bankDetails?.ifscCode &&
          Boolean(formik.errors.bankDetails?.ifscCode)
        }
        helperText={
          formik.touched.bankDetails?.ifscCode &&
          formik.errors.bankDetails?.ifscCode
        }
      />

      {/* Account Holder Name */}
      <TextField
        fullWidth
        className="!mt-5"
        name="bankDetails.accountHolderName"
        label="Account Holder Name"
        value={formik.values.bankDetails.accountHolderName}
        onChange={formik.handleChange}
        error={
          formik.touched.bankDetails?.accountHolderName &&
          Boolean(formik.errors.bankDetails?.accountHolderName)
        }
        helperText={
          formik.touched.bankDetails?.accountHolderName &&
          formik.errors.bankDetails?.accountHolderName
        }
      />
    </div>
  );
};

export default BecomeSellerFormStep3;
