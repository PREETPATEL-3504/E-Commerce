import React from "react";
import { useNavigate } from "react-router-dom";
import AdminProductlist from "./adminProductlist";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const Addhandler = () => {
    navigate("/add-product");
  };
  return (
    <>
      <div className="text-3xl text-white text-center">Admin Dashboard</div>
      <button
        className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
        onClick={Addhandler}
      >
        Add Products
      </button>
      <AdminProductlist/>
    </>
  );
};

export default AdminDashboard;