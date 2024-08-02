import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PopUpForm from "./popUpForm";

const OrderList = () => {
  interface Order {
    id: number;
    name: string;
    quantity: number;
    price: number;
    status: string;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [trigger, setTrigger] = useState(true);
  const userId = localStorage.getItem("id");
  const socket = useSelector((store: any) => store.users.socket);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

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
  }, [trigger]);

  const rejectHandler = (id: any) => {
    togglePopup();
    setTrigger(!trigger);
    // const url = `http://localhost:5000/order/reject/${id}`;
    // axios.patch(url).then((res) => {
    //   toast.success("Order rejected successfully", {
    //     autoClose: 1000,
    //   });
    //   setTrigger(!trigger);
    // });
  };

  const acceptHandler = (id: any) => {
    const url = `http://localhost:5000/order/accept/${id}`;
    axios.patch(url).then((res) => {
      toast.success("Order accepted successfully", {
        autoClose: 1000,
      });
      setTrigger(!trigger);
    });
  };

  useEffect(() => {
    if (socket) {
      socket.on("orderAdd", (data: any) => {
        setOrders([...orders, data]);
      });
    }
  }, [socket, orders]);

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
              <tr key={order.id} className="">
                <PopUpForm isVisible={isPopupVisible} onClose={togglePopup} id={order.id}/>
                <td className="py-2 px-4 border-b text-end">{order.id}</td>
                <td className="py-2 px-4 border-b text-center">{order.name}</td>
                <td className="py-2 px-4 border-b text-end">
                  {order.quantity}
                </td>
                <td className="py-2 px-4 border-b text-end">{order.price} $</td>
                <td className="py-2 px-4 border-b text-end">
                  {order.price * order.quantity} $
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {order.status === "Pending" ? (
                    <div className="">
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
                    </div>
                  ) : (
                    <div>
                      {order.status === "Accepted" ? (
                        <span className="bg-green-500 text-white py-1 px-3 rounded mr-2">
                          Accepted
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white py-1 px-3 rounded mr-2">
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
        <button className="mt-5">
          <Link
            to="/admin"
            className="text-white py-2 px-4  rounded bg-blue-500 hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </button>
      </div>
      );
    </>
  );
};

export default OrderList;
