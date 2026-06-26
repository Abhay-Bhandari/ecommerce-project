import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";
import { useAppDispatch, useApppSelector } from "../../../State/store";

function LoginForm() {
  const dispatch = useAppDispatch();

  const { auth } = useApppSelector((store) => store);
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log("form data", values);
      dispatch(signin(values));
    },
  });

  const handleSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl  text-primary-color pb-8">
        Login
      </h1>
      <div className="space-y-3">
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

        {auth.otpSent && (
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
        )}

        {auth.otpSent ? (
          <Button
            onClick={() => formik.handleSubmit()}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            Login
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
            onClick={handleSendOtp}
          >
            {auth.loading ? <CircularProgress /> : "Send OTP"}
            Send OTP
          </Button>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
