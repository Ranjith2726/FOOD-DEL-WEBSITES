import React from "react";
import "./MyOrders.css";

const MyOrders = () => {
  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="my-orders-empty">
        <h3>No orders yet</h3>
        <p>Your placed orders will appear here after checkout.</p>
      </div>
    </div>
  );
};

export default MyOrders;