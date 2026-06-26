import { TextField } from "@mui/material";
import React from "react";

interface BecomeSellerFormStep2Props {
  formik: any;
}

const BecomeSellerFormStep4 = ({ formik }: BecomeSellerFormStep2Props) => {
  return (
    <div className="space-y-5">
      {/* Business Name */}
      <TextField
        fullWidth
        className="!mt-5"
        name="bussinessDetails.bussinessName"
        label="Business Name"
        value={formik.values.bussinessDetails.bussinessName}
        onChange={formik.handleChange}
        error={
          formik.touched.bussinessDetails?.bussinessName &&
          Boolean(formik.errors.bussinessDetails?.bussinessName)
        }
        helperText={
          formik.touched.bussinessDetails?.bussinessName &&
          formik.errors.bussinessDetails?.bussinessName
        }
      />

      {/* Seller Name */}
      <TextField
        fullWidth
        name="sellerName"
        className="!mt-5"
        label="Seller Name"
        value={formik.values.sellerName}
        onChange={formik.handleChange}
        error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
        helperText={formik.touched.sellerName && formik.errors.sellerName}
      />

      {/* Email */}
      <TextField
        fullWidth
        name="email"
        label="Email"
        className="!mt-5"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      {/* Password */}
      <TextField
        fullWidth
        name="password"
        type="password"
        label="Password"
        className="!mt-5"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
    </div>
  );
};

export default BecomeSellerFormStep4;
