import React from "react";

const Admin = () => {
  const storedOrders = localStorage.getItem("orders");
  const orders = storedOrders ? JSON.parse(storedOrders) : [];
  const num = 0;

  return (
    <div>
      {orders.map((order, orderIndex) => (
        <div key={orderIndex}>
          {order.map((item, itemIndex) => console.log({ itemIndex }, { item }))}
        </div>
      ))}
    </div>
  );
};

export default Admin;
