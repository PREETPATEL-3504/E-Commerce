import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("id");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/order/${userId}`);
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

  const rejectHandler = (id: any) => {
    const url = `http://localhost:5000/order/reject/${id}`;
    axios.patch(url).then((res) => {
      toast.success("Order rejected successfully", {
        autoClose: 1000,
      });
    });
  };

  const acceptHandler = (id: any) => {
    const url = `http://localhost:5000/order/accept/${id}`;
    axios.patch(url).then((res) => {
      toast.success("Order accepted successfully", {
        autoClose: 1000,
      });
    });
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-white text-centerfont-bold mb-4">
          Orders
        </h1>
        <table className="min-w-full bg-white border">
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
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.name}</td>
                <td className="py-2 px-4 border-b">{order.quantity}</td>
                <td className="py-2 px-4 border-b">{order.price}</td>
                <td className="py-2 px-4 border-b">
                  {order.price * order.quantity}
                </td>
                <td className="py-2 px-4 border-b">
                  {order.status === "rejected" || "accepted" ? (
                    <span className="text-black">{order.status}</span>
                  ) : (
                    <div>
                      <button
                        onClick={() => acceptHandler(order.id)}
                        className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => rejectHandler(order.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => rejectHandler(order.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        );
      </div>
    </>
  );
};

export default OrderList;
