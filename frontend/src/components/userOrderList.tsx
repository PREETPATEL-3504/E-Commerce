import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PopUpForm from "./popUpForm";
import env from "react-dotenv";

const UserOrderList = () => {
  const [orders, setOrders] = useState<any>([]);
  const userId = localStorage.getItem("id");
  const socket = useSelector((store: any) => store.users.socket);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const togglePopup = (orderId: any | null = null) => {
    setIsPopupVisible(!isPopupVisible);
    setCurrentOrderId(orderId);
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${env.API}order/user/${userId}`);
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
        const updatedOrder: any = orders.find((o: any) => o.id == orderId);
        if (updatedOrder) {
          updatedOrder.status = "Accepted";
          setOrders([...orders]);
        }
      });

      socket.on("orderReject", (orderId: any) => {
        const updatedOrder: any = orders.find((o: any) => o.id == orderId);
        if (updatedOrder) {
          updatedOrder.status = "Rejected";
          setOrders([...orders]);
        }
      });

      socket.on("orderCancel", (orderId: any) => {
        const updatedOrder: any = orders.find((o: any) => o.id == orderId);
        if (updatedOrder) {
          updatedOrder.status = "Cancelled";
          setOrders([...orders]);
        }
      });
    }
  }, [orders]);

  const rejectHandler = (id: any) => {
    togglePopup(id);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-white text-center font-bold mb-4">
          Orders
        </h1>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300">Order ID</th>
              <th className="py-3 px-4 border-b border-gray-300">Image</th>
              <th className="py-3 px-4 border-b border-gray-300">
                Product Name
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center">
                Quantity
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center">
                Price
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center">
                Total Amount
              </th>
              <th className="py-3 px-4 border-b border-gray-300">
                Order Status
              </th>
              <th className="py-3 px-4 border-b border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {orders.length === 0 ? (
              <tr className="text-center">
                <td>No orders found</td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="py-3 px-4 border-b border-gray-300 text-right font-medium">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center">
                    <img
                      src={`${env.API}${order.image}`}
                      alt="Product Image"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center">
                    {order.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-right font-medium">
                    {order.quantity}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-right font-medium">
                    ${order.price}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-right font-medium">
                    ${order.price * order.quantity}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full  text-xs font-semibold ${
                        order.status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center">
                    <button
                      disabled={
                        order.status == "Cancelled" ||
                        order.status == "Rejected"
                      }
                      onClick={() => rejectHandler(order.id)}
                      className={`bg-red-600 text-white text-xs font-bold py-1 px-3 rounded hover:bg-red-700 transition duration-300 ${
                        order.status == "Cancelled" ||
                        order.status == "Rejected"
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button className="bg-gray-700 text-white font-semibold py-2 px-4 mt-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
          <Link to="/user">Continue Shopping</Link>
        </button>
      </div>
      {isPopupVisible && (
        <PopUpForm
          isVisible={isPopupVisible}
          onClose={togglePopup}
          id={currentOrderId}
        />
      )}
    </>
  );
};

export default UserOrderList;
