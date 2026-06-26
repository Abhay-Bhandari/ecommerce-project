import React from "react";
import { Route, Routes } from "react-router";
import { Dashboard } from "@mui/icons-material";
import Product from "../customer/pages/Product/Product";
import AddProduct from "../seller/pages/products/AddProduct";
import Order from "../customer/pages/Account/Order";
import Profile from "../seller/pages/Account/Profile";
import Transaction from "../seller/pages/Payment/Transaction";
import Payment from "../seller/pages/Payment/Payment";

function SellerRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default SellerRoutes;
