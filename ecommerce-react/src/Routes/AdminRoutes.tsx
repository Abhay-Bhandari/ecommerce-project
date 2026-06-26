import React from "react";
import { Route, Routes } from "react-router";
import SellerTable from "../admin/pages/Sellers/SellerTable";
import AddNewCouponForm from "../admin/pages/coupon/AddNewCouponForm";
import Coupon from "../admin/pages/coupon/Coupon";
import GridTable from "../admin/pages/HomePage/GridTable";
import ElectronicTable from "../admin/pages/HomePage/ElectronicTable";
import ShopByCategoryTable from "../admin/pages/HomePage/ShopByCategoryTable";
import Deal from "../admin/pages/HomePage/Deal";

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SellerTable />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/addd-coupon" element={<AddNewCouponForm />} />
        <Route path="/home-grid" element={<GridTable />} />
        <Route path="/electronics-category" element={<ElectronicTable />} />
        <Route path="/shop-by-category" element={<ShopByCategoryTable />} />
        <Route path="/deals" element={<Deal />} />
      </Routes>
    </div>
  );
}

export default AdminRoutes;
