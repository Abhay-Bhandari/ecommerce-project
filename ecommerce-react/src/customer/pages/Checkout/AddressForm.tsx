import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik/dist";
import React from "react";
import * as Yup from "yup";
import { useAppDispatch } from "../../../State/store";
import { createOrder } from "../../../State/customer/orderSlice";

const AddressFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .required("Mobile is required")
    .matches(/^[6-9]\d{9}$/, "Mobile number must be 10 digits"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[1-9][0-9]{5}$/, "Pincode must be 6 digits"),
  locality: Yup.string().required("Locality is required"),
});

const AddressForm = ({ paymentGateway }: any) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      locality: "",
    },
    validationSchema: AddressFormSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        createOrder({
          address: values,
          jwt: localStorage.getItem("jwt") || "",
          paymentGateway: paymentGateway,
        }),
      );
    },
  });

  return (
    <Box sx={{ max: "auto" }}>
      <p className="text-xl font-bold text-center pb-5">Contact Details</p>

      <form onSubmit={formik.handleSubmit} action="">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.errors.name}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="mobile"
              label="mobile"
              variant="outlined"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="pinCode"
              label="pincode"
              variant="outlined"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              variant="outlined"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="locality"
              label="locality"
              variant="outlined"
              value={formik.values.locality}
              onChange={formik.handleChange}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="city"
              label="city"
              variant="outlined"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="state"
              label="state"
              variant="outlined"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
        </Grid>
        <Grid className="py-5" size={{ xs: 12 }}>
          <Button
            fullWidth
            sx={{ py: "14px" }}
            variant="contained"
            type="submit"
          >
            Add Address
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm;
