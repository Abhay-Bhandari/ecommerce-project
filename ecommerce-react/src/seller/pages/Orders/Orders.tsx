import React, { useEffect } from "react";
import { useAppDispatch, useApppSelector } from "../../../State/store";
import { fetchUserOrderHistory } from "../../../State/customer/orderSlice";
import OrderItem from "../../../customer/pages/Account/OrderItemCard";

function Orders() {
  const dispatch = useAppDispatch();
  const { order } = useApppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
  }, []);

  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold">All Orders</h1>
        <p>from anytime</p>
      </div>

      <div className="space-y-2">
        {order.orders.map((order) =>
          order.orderItems.map((item) => (
            <OrderItem order={order} item={item} />
          )),
        )}
      </div>
    </div>
  );
}

export default Orders;
