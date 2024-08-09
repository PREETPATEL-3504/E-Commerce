import React from "react";
import { useNavigate } from "react-router-dom";
import AdminProductlist from "./adminProductlist";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const Addhandler = () => {
    navigate("/add-product");
  };

  const orderhandler = () => {
    navigate("/order");
  };
  return (
    <>
      <div className="p-6 bg-gray-800 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex-1 flex justify-center">
          <div className="text-4xl font-bold text-white">Admin Dashboard</div>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            onClick={Addhandler}
          >
            Add Products
          </button>

          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            onClick={orderhandler}
          >
            Orders
          </button>
        </div>
      </div>
    </div>
      <AdminProductlist />
    </>
  );
};

export default AdminDashboard;
