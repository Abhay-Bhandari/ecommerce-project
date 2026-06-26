import { Delete, Edit, MinimizeTwoTone } from "@mui/icons-material";
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
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useApppSelector } from "../../../State/store";
import { getAllDeals } from "../../../State/admin/DealSlice";

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

export default function DealTable() {
  const dispatch = useAppDispatch();
  const { deal } = useApppSelector((store) => store);

  useEffect(() => {
    dispatch(getAllDeals());
  }, [dispatch]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NO</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.calories}</TableCell>
              <TableCell>{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">
                <Button>
                  <Edit />
                </Button>
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <Delete sx={{ color: "red" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
