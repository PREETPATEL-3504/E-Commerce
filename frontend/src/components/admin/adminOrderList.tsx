import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PopUpForm from "../common/popUpForm";
import env from "react-dotenv";

const OrderList = () => {
  interface Order {
    id: number;
    name: string;
    quantity: number;
    price: number;
    status: string;
    image_url: any;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [trigger, setTrigger] = useState(true);
  const userId = localStorage.getItem("id");
  const socket = useSelector((store: any) => store.users.socket);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [trigger, socket, orders]);

  useEffect(() => {
    if (socket) {
      socket.on("orderAdd", (data: any) => {
        setOrders([...orders, data]);
      });

      socket.on("orderCancel", (orderId: any) => {
        const updatedOrder: any = orders.find((o: any) => o.id == orderId);
        if (updatedOrder) {
          updatedOrder.status = "Cancelled";
          setOrders([...orders]);
        }
      });
    }
  }, [socket, orders]);

  const togglePopup = (orderId: any | null = null) => {
    setIsPopupVisible(!isPopupVisible);
    setCurrentOrderId(orderId);
    setTrigger(!trigger);
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${env.API}order/${userId}`);
      setOrders(response.data);
    } catch (error) {
      toast.error("Failed to fetch orders", {
        autoClose: 500,
      });
    }
  };

  const rejectHandler = (id: any) => {
    togglePopup(id);
  };

  const acceptHandler = (id: any) => {
    const url = `${env.API}order/accept/${id}`;
    axios.patch(url).then((res) => {
      toast.success("Order accepted successfully", {
        autoClose: 1000,
      });
      setTrigger(!trigger);
    });
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-white text-center font-bold mb-4">
          Orders
        </h1>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border-b border-gray-200">Order ID</th>
              <th className="py-3 px-4 border-b border-gray-200">Image</th>
              <th className="py-3 px-4 border-b border-gray-200">
                Customer name
              </th>
              <th className="py-3 px-4 border-b border-gray-200">
                Product Name
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center">
                Quantity
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center">
                Price
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center">
                Total Amount
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {orders.length === 0 ? (
              <tr className="text-center">
                <td>No orders found</td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-200 text-right font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    <img
                      src={`${env.API}${order.image}`}
                      alt="Product Image"
                      className="w-20 h-20 object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    {order.first_name} {order.last_name} 
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    {order.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-right font-medium">
                    {order.quantity}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-right font-medium">
                    ${order.price}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-right font-medium text-gray-900">
                    ${order.price * order.quantity}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    {order.status === "Pending" ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => acceptHandler(order.id)}
                          className="bg-green-600 text-white text-xs font-semibold py-1 px-3 rounded-lg shadow-md hover:bg-green-700 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => rejectHandler(order.id)}
                          className="bg-red-600 text-white text-xs font-semibold py-1 px-3 rounded-lg shadow-md hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`text-xs font-medium ${
                          order.status === "Completed"
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button className="mt-5">
          <Link
            to="/admin"
            className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
          >
            Back to Home
          </Link>
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

export default OrderList;
