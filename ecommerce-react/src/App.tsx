import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./customer/components/Navbar/Navbar";
import Account from "./customer/pages/Account/Account";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Home from "./customer/pages/Home/Home";
import ProductDetails from "./customer/pages/Product Details/ProductDetails";
import Product from "./customer/pages/Product/Product";
import customTheme from "./Theme/customTheme";
import { ThemeProvider } from "@mui/material";
import BecomeSeller from "./customer/pages/Become Seller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";
import { useEffect } from "react";
import { useAppDispatch, useApppSelector } from "./State/store";
import { fetchSellerProfile } from "./State/seller/sellerSlice";
import Auth from "./customer/pages/Auth/Auth";
import { fetchUserProfile } from "./State/AuthSlice";
import Review from "./customer/pages/Review/Review";
import PaymentSuccess from "./customer/pages/PaymentSuccess";
import Wishlist from "./customer/Wishlist/Wishlist";
import { createHomeCategories } from "./State/customer/customerSlice";
import { homeCategories } from "./data/HomeCategories";

function App() {
  const dispatch = useAppDispatch();
  const { seller, auth } = useApppSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchSellerProfile(jwt));
    }
    dispatch(createHomeCategories(homeCategories));
  }, [dispatch]);

  useEffect(() => {
    if (seller.profile) {
      navigate("/seller");
    }
  }, [navigate, seller.profile]);

  useEffect(() => {
    const jwt = auth.jwt || localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchUserProfile({ jwt }));
    }
  }, [auth.jwt, dispatch]);

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <div>
          <Navbar />
          {/* <Home/> */}
          {/* <Product/> */}
          {/* <ProductDetails /> */}
          {/* <Review /> */}
          {/* <Cart /> */}
          {/* <Checkout /> */}
          {/* <Account /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />

            <Route path="/products/:category" element={<Product />} />
            <Route path="/reviews/:productId" element={<Review />}></Route>
            <Route
              path="/product-details/:categoryId/:name/:productId"
              element={<ProductDetails />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="payment-success/:orderId"
              element={<PaymentSuccess />}
            ></Route>
            <Route path="/account/*" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/become-seller" element={<BecomeSeller />} />
            <Route path="/seller/*" element={<SellerDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
