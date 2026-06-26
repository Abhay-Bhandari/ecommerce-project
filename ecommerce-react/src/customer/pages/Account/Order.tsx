import React, { useEffect } from "react";
import OrderItem from "./OrderItemCard";
import { useAppDispatch, useApppSelector } from "../../../State/store";
import { fetchUserOrderHistory } from "../../../State/customer/orderSlice";

function Order() {
  const dispatch = useAppDispatch();
  const { order } = useApppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold">All Order</h1>
        <p>from anytime</p>
      </div>

      <div className="space-y-5">
        {order.orders.flatMap((orderItem) =>
          orderItem.orderItems.map((item) => (
            <OrderItem key={item.id} item={item} order={orderItem} />
          )),
        )}
      </div>
    </div>
  );
}

export default Order;
