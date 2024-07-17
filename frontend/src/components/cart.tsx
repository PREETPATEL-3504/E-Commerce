import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartProduct, setCartProduct] = useState([""]);
  const UserId = localStorage.getItem("id");
  useEffect(() => {
    const url = `http://localhost:5000/api/cart?UserId=${UserId}`;
    axios.get(url).then((res) => {
      setCartProduct(res.data.data);
    });
  }, []);
  const onDelete = (product: any) => {
    const id = product.id;
    const url = `http://localhost:5000/api/cart/${id}`;
    axios.delete(url).then((res) => {
      toast.success("item remove successfully", {
        autoClose: 1000,
      });
      setCartProduct(cartProduct.filter((p: any) => p.id !== product.id));
    });
  };
  return (
    <>
      {cartProduct.length !== 0 ? (
        cartProduct.map((product: any) => (
          <div
            className="flex items-center p-4 border border-gray-200 rounded-lg shadow-md m-4 bg-white"
            key={product.id}
          >
            <img
              src={`http://localhost:5000/${product.image_url}`}
              alt="Image"
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h2>
              <p className="text-gray-600">ID: {product.productId}</p>
              <p className="text-gray-700 mt-1">Price: {product.price}</p>
              <p className="text-gray-700 mt-1">Quantity: {product.quantity}</p>
              <p className="text-gray-500 mt-1">{product.description}</p>
            </div>
            <div className="ml-4 flex flex-col items-center">
              <button
                //   onClick={() => onBuy(productId)}
                className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Buy
              </button>
              <button
                onClick={() => onDelete(product)}
                className="bg-red-500 w-full text-white px-4 py-2 rounded-lg shadow mt-2 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center mt-[15%] ">
          <h1 className="text-5xl text-white">Your cart is empty</h1>
        </div>
      )}
      <button className="bg-white p-4 m-4 rouded-xl">
        <Link to="/user">Continue Shopping</Link>
      </button>
    </>
  );
};

export default Cart;
