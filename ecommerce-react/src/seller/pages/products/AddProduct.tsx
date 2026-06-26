import { AddPhotoAlternate } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import uploadToCloudinary from "../../../util/uploadToCloudinary";
import { useAppDispatch } from "../../../State/store";
import { createProduct } from "../../../State/seller/sellerProductSlice";

const colors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "White", hex: "#FFFFFF" },
];

function AddProduct() {
  const [uploadImage, setUploadImage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [] as string[],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        createProduct({
          request: values,
          jwt: localStorage.getItem("jwt"),
        }),
      );
    },
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => {
      return child.parentCategoryId === parentCategoryId;
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" size={{ xs: 12 }}>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <label className="relative" htmlFor="fileInput">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center">
                <AddPhotoAlternate className="text-gray-700" />
              </span>
              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>

            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    src={image}
                    alt={`ProductImage ${index + 1}`}
                    className="w-24 h-24 object-cover"
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    ✕
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              multiline
              rows={4}
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              fullWidth
              id="mrpPrice"
              name="mrpPrice"
              label="MRP Price"
              type="number"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              type="number"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                label="Color"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {colors.map((color) => (
                  <MenuItem key={color.name} value={color.name}>
                    <div className="flex gap-3">
                      <span
                        style={{ backgroundColor: color.hex }}
                        className={`h-5 w-5 rounded-full ${
                          color.name === "White" ? "border" : ""
                        }`}
                      ></span>
                      <p>{color.name}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              sx={{ p: "14px" }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddProduct;
