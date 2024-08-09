import axios from "axios";
import { useEffect, useState } from "react";
// import env from "react-dotenv";
import { useNavigate, useParams } from "react-router-dom";

const Orderdetails = () => {
  const [order, setOrder] = useState<any>([]);
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fethData();
  }, []);

  const fethData = async () => {
    const url = `${process.env.REACT_APP_API_URL}order/order-details/${id}`;
    const res = await axios.get(url);
    setOrder(res.data[0]);
  };

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="flex flex-col sm:flex-row items-start">
          <div className=" h-full">
            <img
              src={`${process.env.REACT_APP_API_URL}${order.image}`}
              alt={order?.name}
              className="w-20 h-30 object-cover rounded-md"
            />
          </div>

          <div className="flex-grow mt-4 sm:mt-0 sm:ml-6 w-full sm:w-2/3 text-center sm:text-left">
            <p className="text-gray-600 mt-1">Order ID: #{order?.id}</p>

            <h1 className="text-xl   font-bold text-gray-900">{order?.name}</h1>

            <div className="flex items-center justify-center sm:justify-start">
              <span className="text-gray-700 text-l ">Price:</span>
              <p className="text-l font-semibold text-gray-900 ml-1">
                ${order?.price}
              </p>
            </div>

            <div className="flex items-center justify-center sm:justify-start">
              <span className="text-gray-700 text-l ">Quantity:</span>
              <p className="text-l font-semibold text-gray-900 ml-1">
                {order?.quantity}
              </p>
            </div>

            <div className="flex items-center justify-center sm:justify-start">
              <span className="text-gray-700 text-l ">Total:</span>
              <p className="text-l font-semibold text-gray-900 ml-1">
                ${order?.price * order?.quantity}
              </p>
            </div>
          </div>
        </div>
        {/* User Details */}
        <div className="mt-6">
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              User Details
            </h2>
            <div className="mt-2">
              <p className="text-gray-700">
                <strong>Name:</strong> {order?.first_name} {order?.last_name}
              </p>
              <p className="text-gray-700 mt-1">
                <strong>Email:</strong> {order?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6 sm:mt-8 space-y-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={() => navigate("/order")}
          >
            View More Orders
          </button>
        </div>
      </div>
    </>
  );
};

export default Orderdetails;
