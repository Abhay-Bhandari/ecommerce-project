import { Box, Button, IconButton, TableBody } from "@mui/material";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useApppSelector } from "../../../State/store";
import { fetchSellerProduct } from "../../../State/seller/sellerProductSlice";
import type { Product } from "../../../types/ProductType";
import { Edit } from "@mui/icons-material";

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

export default function ProductTable() {
  const dispatch = useAppDispatch();
  const { sellerProduct } = useApppSelector((store) => store);

  React.useEffect(() => {
    dispatch(fetchSellerProduct(localStorage.getItem("jwt")));
  });
  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Images</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">MRP</TableCell>
            <TableCell align="right">Selling Price</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Update Stock</TableCell>
            <TableCell align="right">Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerProduct.products.map((item: Product) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                <div className="flex gap-1 flex-wrap">
                  {item.images.map((image) => (
                    <img src={image} className="w-20 rounded-md" alt="" />
                  ))}
                </div>
              </TableCell>
              <TableCell align="right">{item.title}</TableCell>
              <TableCell align="right">{item.mrpPrice}</TableCell>
              <TableCell align="right">{item.sellingPrice}</TableCell>
              <TableCell align="right">{item.color}</TableCell>
              <TableCell align="right">
                <Button size="small">in-stock</Button>
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" size="small">
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
