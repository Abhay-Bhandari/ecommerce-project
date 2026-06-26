import { Edit, MinimizeTwoTone } from "@mui/icons-material";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  tableCellClasses,
  styled,
  Button,
} from "@mui/material";
import React from "react";
import type { HomeCategory } from "../../../types/HomeCategoryType";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function HomeCategoryTable({ data }: { data: HomeCategory[] }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Id</TableCell>
            <TableCell>Image</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{category.id}</TableCell>
              <TableCell>
                <img src={category.image} className="w-20 rounded-md" alt="" />
              </TableCell>
              <TableCell align="right">{category.categoryId}</TableCell>
              <TableCell align="right">
                <Button>
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
