import { Box, Divider, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep1 = ({ formik }: any) => {
  return (
    <Box className="">
      <p className="text-xl font-bold text-center pb-9">Contact Details</p>
      <div className="">
        <TextField
          fullWidth
          name="mobile"
          label="Mobile"
          variant="outlined"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />

        <div className="py-2"></div>

        <TextField
          fullWidth
          name="GSTIN"
          label="GSTIN"
          variant="outlined"
          value={formik.values.GSTIN}
          onChange={formik.handleChange}
          error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
          helperText={formik.touched.GSTIN && formik.errors.GSTIN}
        />
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep1;
