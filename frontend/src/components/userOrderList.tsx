import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserOrderList = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("id");
  const socket = useSelector((store: any) => store.users.socket);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/order/user/${userId}`
      );
      setOrders(response.data);
    } catch (error) {
      toast.error("Failed to fetch orders", {
        autoClose: 500,
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("orderAccept", (orderId: any) => {
        console.log("=============", orderId);
        const updatedOrder: any = orders.find((o: any) => o.id == orderId);
        console.log("=============", updatedOrder);
        if (updatedOrder) {
          updatedOrder.status = "Accepted";
          setOrders([...orders]);
        }
      });
    }
  }, [orders]);

  useEffect(() => {
    if (socket) {
      socket.on("orderReject", (orderId: any) => {
        const updatedOrder: any = orders.find((o: any) => o.id == orderId);
        if (updatedOrder) {
          updatedOrder.status = "Rejected";
          setOrders([...orders]);
        }
      });
    }
  }, [orders]);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-white text-center font-bold mb-4">
          Orders
        </h1>
        <table className="min-w-full bg-white border-slate-500">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Total amount</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b text-end">{order.id}</td>
                <td className="py-2 px-4 border-b text-center">{order.name}</td>
                <td className="py-2 px-4 border-b text-end">
                  {order.quantity}
                </td>
                <td className="py-2 px-4 border-b text-end">{order.price} $</td>
                <td className="py-2 px-4 border-b text-end">
                  {order.price * order.quantity} $
                </td>
                <td>
                  {order.status === "Pending" ? (
                    <div className="text-center">
                      <span className="bg-cyan-600 text-white font-bold py-1 px-3 rounded mr-2">
                        Pending
                      </span>
                    </div>
                  ) : (
                    <div className="text-center">
                      {order.status === "Accepted" ? (
                        <span className="bg-green-500  text-center font-bold text-white py-1 px-3 rounded mr-2">
                          Accepted
                        </span>
                      ) : (
                        <span className="bg-red-500  text-center font-bold text-white py-1 px-3 rounded mr-2">
                          Rejected
                        </span>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="bg-white p-4 m-4 rouded-xl rounded-lg">
          <Link to="/user">Continue Shopping</Link>
        </button>
      </div>
      );
    </>
  );
};

export default UserOrderList;
