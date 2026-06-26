import React from "react";
import DrawerList from "../../component/DrawerList";
import {
  AccountBox,
  Add,
  Category,
  ElectricBolt,
  Home,
  IntegrationInstructions,
  LocalOffer,
  Logout,
} from "@mui/icons-material";

const menu = [
  {
    name: "Coupons",
    path: "/admin/coupon",
    icon: <IntegrationInstructions className="text-primary-color" />,
    activeIcon: <IntegrationInstructions className="text-white" />,
  },
  {
    name: "Add New Coupon",
    path: "/admin/add-new-coupon",
    icon: <Add className="text-primary-color" />,
    activeIcon: <Add className="text-white" />,
  },
  {
    name: "Home Page",
    path: "/admin/home-grid",
    icon: <Home className="text-primary-color" />,
    activeIcon: <Home className="text-white" />,
  },
  {
    name: "Electronics Category",
    path: "/admin/electronics-category",
    icon: <ElectricBolt className="text-primary-color" />,
    activeIcon: <ElectricBolt className="text-white" />,
  },
  {
    name: "Deals",
    path: "/admin/deals",
    icon: <LocalOffer className="text-primary-color" />,
    activeIcon: <LocalOffer className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox className="text-primary-color" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout className="text-primary-color" />,
    activeIcon: <Logout className="text-white" />,
  },
];

const AdminDrawerList = ({ menu, menu2, toggleDrawer }: any) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};
export default AdminDrawerList;
