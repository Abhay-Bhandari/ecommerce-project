import { useFormik } from "formik";
import React from "react";
import { useAppDispatch } from "../../../State/store";
import { sendLoginSignupOtp } from "../../../State/AuthSlice";
import { Button, TextField } from "@mui/material";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      fullName: "",
    },
    onSubmit: (values) => {
      console.log("form data", values);
    },
  });

  const handleSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl  text-primary-color pb-8">
        Register
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

        <div className="space-y-5">
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
            />
          </div>
          <TextField
            fullWidth
            className="!mt-5"
            label="fullName"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
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
          Signup
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
