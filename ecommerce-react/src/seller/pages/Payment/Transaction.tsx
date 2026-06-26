import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useApppSelector } from "../../../State/store";
import { fetchTransactionsBySeller } from "../../../State/seller/transactionSlice";

export default function TransactionTable() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt") || ""));
  }, []);

  const { transactions } = useApppSelector((store) => store);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Customer Details</TableCell>
            <TableCell align="right">Order ID</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.transactions.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.date}
              </TableCell>
              <TableCell component="th" align="right" scope="row">
                {item.customer.email}
              </TableCell>
              <TableCell align="right">{item.order.id}</TableCell>
              <TableCell align="right">
                {item.order.totalSellingPrice}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
