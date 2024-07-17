import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";

const Cart = () => {
  const [cartProduct, setCartProduct] = useState([""]);
  const UserId = localStorage.getItem("id");


  const onDelete = (product: any) => {
    const id = product.id;
    const url = `http://localhost:5000/cart/cart/${id}`;
    axios.delete(url).then((res) => {
      toast.success("item remove successfully", {
        autoClose: 1000,
      });
      setCartProduct(cartProduct.filter((p: any) => p.id !== product.id));
    });
  };

  const addHandler = (item: any) => {
    const id = item["ProductId"];
    try {
      const url = `http://localhost:5000/cart/cart/add/${id}?UserId=${UserId}`;
      axios
        .put(url, { quantity: item.quantity + 1 })
        .then((res) => {
          toast.success("Quantity increased successfully", {
            autoClose: 1000,
          });
        })
        .catch((err) => {
          console.error("Error adding to cart:", err);
          toast.error("Error adding to cart", {
            autoClose: 1000,
          });
        });
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Error adding to cart", {
        autoClose: 1000,
      });
    }
  };

  const removeHandler = (item: any) => {
    const id = item["ProductId"];
    try {
      const url = `http://localhost:5000/cart/cart/remove/${id}?UserId=${UserId}`;
      axios
        .put(url, { quantity: item.quantity + 1 })
        .then((res) => {
          toast.success("Quantity decrease successfully", {
            autoClose: 1000,
          });
        })
        .catch((err) => {
          console.error("Error adding to cart:", err);
          toast.error("Error adding to cart", {
            autoClose: 1000,
          });
        });
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Error adding to cart", {
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    const url = `http://localhost:5000/cart/cart?UserId=${UserId}`;
    axios.get(url).then((res) => {
      setCartProduct(res.data.data);
    });
  }, [addHandler, removeHandler]);

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

              <p className="text-gray-700 mt-1 flex gap-2 items-center">
                Quantity:{" "}
                <button
                  onClick={() => {
                    removeHandler(product);
                  }}
                >
                  <TiMinus />
                </button>
                {product.quantity}
                <button
                  onClick={() => {
                    addHandler(product);
                  }}
                >
                  <TiPlus />
                </button>
              </p>

              <p className="text-gray-500 mt-1">{product.description}</p>
            </div>
            <div className="ml-4 flex flex-col items-center">
              <button className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
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
