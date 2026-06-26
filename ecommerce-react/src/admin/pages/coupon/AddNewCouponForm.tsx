import { useFormik } from "formik";
import React from "react";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

interface CouponFromValues {
  code: string;
  discountPercentage: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}

const AddNewCouponForm = () => {
  const formik = useFormik<CouponFromValues>({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    onSubmit: (values) => {
      console.log(values);
      const formatedValues = {
        ...values,
        validityStartDate: values.validityStartDate?.toISOString(),
        validityEndDate: values.validityEndDate?.toISOString(),
      };
      console.log("form submiteed", values, formatedValues);
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-color pb-5 text-center">
        Create New Coupon
      </h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Coupon Code"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Discount Percentage"
                name="discountPercentage"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                error={
                  formik.touched.discountPercentage &&
                  Boolean(formik.errors.discountPercentage)
                }
                helperText={
                  formik.touched.discountPercentage &&
                  formik.errors.discountPercentage
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Validity Start Date"
                name="validityStartDate"
                value={formik.values.validityStartDate}
                onChange={(date) =>
                  formik.setFieldValue("validityStartDate", date)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Validity End Date"
                name="validityEndDate"
                value={formik.values.validityEndDate}
                onChange={(date) =>
                  formik.setFieldValue("validityEndDate", date)
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Minimum Order Value"
                name="minimumOrderValue"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                error={
                  formik.touched.minimumOrderValue &&
                  Boolean(formik.errors.minimumOrderValue)
                }
                helperText={
                  formik.touched.minimumOrderValue &&
                  formik.errors.minimumOrderValue
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                sx={{ py: ".8rem" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Create Coupon
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default AddNewCouponForm;
