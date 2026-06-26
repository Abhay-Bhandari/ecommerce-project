import { MinimizeTwoTone } from "@mui/icons-material";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  tableCellClasses,
  styled,
  dividerClasses,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useApppSelector } from "../../../State/store";
import {
  fetchSellerOrders,
  updateOrderStatus,
} from "../../../State/seller/sellerOrderSlice";

const orderStatus = [
  { color: "#f59e0b", label: "PENDING" }, // Amber
  { color: "#0ea5e9", label: "CONFIRMED" }, // Sky Blue
  { color: "#6366f1", label: "PLACED" }, // Indigo
  { color: "#3b82f6", label: "SHIPPED" }, // Blue
  { color: "#16a34a", label: "DELIVERED" }, // Green
  { color: "#dc2626", label: "CANCELLED" }, // Red
];

const orderStatusColor = {
  PENDING: { color: "#f59e0b", label: "PENDING" }, // Amber
  CONFIRMED: { color: "#0ea5e9", label: "CONFIRMED" }, // Sky Blue
  PLACED: { color: "#6366f1", label: "PLACED" }, // Indigo
  SHIPPED: { color: "#3b82f6", label: "SHIPPED" }, // Blue
  DELIVERED: { color: "#16a34a", label: "DELIVERED" }, // Green
  CANCELLED: { color: "#dc2626", label: "CANCELLED" }, // Red
};

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

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const { sellerOrders } = useApppSelector((store) => store);

  React.useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<any | any>({});
  const open = Boolean(anchorEl);

  const handleClick = (event: any, orderId: number) => {
    setAnchorEl((prev: any) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId: number) => () => {
    setAnchorEl((prev: any) => ({ ...prev, [orderId]: null }));
  };

  const handleUpdateOrderStatus = (orderId: number, orderStatus: any) => () => {
    dispatch(
      updateOrderStatus({
        jwt: localStorage.getItem("jwt") || "",
        orderId,
        orderStatus,
      }),
    );
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Products</TableCell>
            <TableCell align="right">Shipping Address</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right">Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerOrders.orders.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {item.orderItems.map((orderItem: any) => (
                    <div className="flex gap-5 ">
                      <img
                        className="w-20 rounded-md"
                        src={orderItem.product.images[0]}
                        alt=""
                      />
                      <div className="flex flex-col justify-between py-2">
                        <h1>Title: {orderItem.product.title}</h1>
                        <h1>Selling Price: {orderItem.product.sellingPrice}</h1>
                        <h1>Color: {orderItem.color}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell align="right">
                <div className="flex flex-col gap-y-2">
                  <h1>{item.shippingAddress.name}</h1>
                  <h1>
                    {item.shippingAddress.address}, {item.shippingAddress.city}
                  </h1>
                  <h1>
                    {item.shippingAddress.state}, {item.shippingAddress.pincode}
                  </h1>
                  <h1>
                    <strong>Mobile: </strong>
                    {item.shippingAddress.phoneNumber}
                  </h1>
                </div>
              </TableCell>
              <TableCell align="right">
                <span className="px-5 py-2 border rounded-full text-primary-color border-primary-color">
                  {item.orderStatus}
                </span>
              </TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="primary"
                  onClick={(e) => handleClick(e, item.id)}
                >
                  Dashboard
                </Button>
                <Menu
                  id={`status-menu ${item.id}`}
                  anchorEl={anchorEl[item.id]}
                  open={Boolean(anchorEl[item.id])}
                  onClose={handleClose(item.id)}
                  MenuListProps={{
                    "aria-labelledby": `status-menu ${item.id}`,
                  }}
                >
                  {orderStatus.map((status) => (
                    <MenuItem
                      key={status.label}
                      onClick={handleUpdateOrderStatus(item.id, status.label)}
                    >
                      {status.label}
                    </MenuItem>
                  ))}
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
