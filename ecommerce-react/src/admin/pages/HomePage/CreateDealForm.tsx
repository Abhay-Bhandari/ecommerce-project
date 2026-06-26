import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useAppDispatch } from "../../../State/store";

const CreateDealForm = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: "",
    },
    onSubmit(values) {
      console.log(values);
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      className="space-y-6"
    >
      <Typography variant="h4" className="text-center">
        Create Deal
      </Typography>

      <TextField
        fullWidth
        name="discount"
        label="Discount"
        variant="outlined"
        value={formik.values.discount}
        onChange={formik.handleChange}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && formik.errors.discount}
      />

      <FormControl fullWidth>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          label="Category"
        >
          <MenuItem value="">Select Category</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="clothing">Clothing</MenuItem>
          <MenuItem value="books">Books</MenuItem>
        </Select>
      </FormControl>

      <Button sx={{ py: ".9rem" }} type="submit" variant="contained">
        Create Deal
      </Button>
    </Box>
  );
};

export default CreateDealForm;
