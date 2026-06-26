import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../State/store";
import { logout } from "../State/AuthSlice";

interface menuItems {
  name: string;
  path: string;
  icon: any;
  activeIcon: any;
}

interface DrawerListProps {
  menu: menuItems[];
  menu2: menuItems[];
  toggleDrawer: () => void;
}

const DrawerList = ({ menu, menu2, toggleDrawer }: DrawerListProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">
        <Divider />
        <div className="space-y-2">
          {menu.map((item: any, index: number) => (
            <div
              onClick={() => {
                navigate(item.path);
                if (item.path == "/") handleLogout();
              }}
              className="pr-9 cursor-pointer"
              key={index}
            >
              <p
                className={`hover:bg-primary-color hover:text-white transition-all${item.path == location.pathname ? "bg-primary-color text-white" : "text-primary-color"} flex items-center px-5 py-3 rounded-r-full`}
              >
                <ListItemIcon>
                  {item.path === location.pathname
                    ? item.activeIcon
                    : item.icon}
                </ListItemIcon>

                <ListItemText primary={item.name} />
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-2 border-t pt-5">
          {menu2.map((item, index) => {
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(item.path + "/");

            return (
              <div
                key={index}
                onClick={() => {
                  navigate(item.path);
                  toggleDrawer();
                }}
                className="cursor-pointer pr-9"
              >
                <div
                  className={`flex items-center px-5 py-3 rounded-r-full ${
                    isActive
                      ? "bg-primary-color text-white"
                      : "text-primary-color"
                  } hover:bg-primary-color hover:text-white transition-all`}
                >
                  <ListItemIcon>
                    {isActive ? item.activeIcon : item.icon}
                  </ListItemIcon>

                  <ListItemText primary={item.name} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
