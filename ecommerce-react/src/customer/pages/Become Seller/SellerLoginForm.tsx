import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useAppDispatch } from "../../../State/store";
import { sendLoginSignupOtp } from "../../../State/AuthSlice";
import { sellerLogin } from "../../../State/seller/sellerAuthSlice";

function SellerLoginForm() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log("form data", values);
      dispatch(sellerLogin({ email: values.email, otp: values.otp }));
    },
  });

  const handleSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-5">
        Login As Seller
      </h1>
      <div className="space-y-5">
        <TextField
          fullWidth
          className="!mt-5"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        ></TextField>

        <div></div>

        <div className="space-y-2">
          <p className="font-medium text-sm opacity-60">
            Enter OTP sent to your email{" "}
          </p>
          <TextField
            fullWidth
            label="Otp"
            name="otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
          ></TextField>
        </div>

        <Button
          fullWidth
          variant="contained"
          sx={{ py: "11px" }}
          onClick={handleSendOtp}
        >
          Send OTP
        </Button>

        <Button
          onClick={() => formik.handleSubmit()}
          fullWidth
          variant="contained"
          sx={{ py: "11px" }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default SellerLoginForm;
