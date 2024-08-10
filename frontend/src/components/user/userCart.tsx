import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import useRazorpay from "react-razorpay";

const Cart = () => {
  const [Razorpay] = useRazorpay();
  const [cartProduct, setCartProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [trigger, setTrigger] = useState(false);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}cart/cart?userId=${userId}`;
    axios.get(url).then((res: any) => {
      setCartProduct(res.data.data);
      const total = res.data.data.reduce(
        (acc: any, product: any) => acc + product.price * product.quantity,
        0
      );
      setCount(total);
    });
  }, [trigger]);

  const onDelete = (product: any) => {
    const id = product.id;
    const url = `${process.env.REACT_APP_API_URL}cart/cart/${id}`;
    axios.delete(url).then((res) => {
      toast.success("item remove successfully", {
        autoClose: 1000,
      });
      setTrigger(!trigger);
      setCartProduct(cartProduct.filter((p: any) => p.id !== product.id));
    });
  };

  const addHandler = (item: any) => {
    const id = item["ProductId"];
    try {
      const url = `${process.env.REACT_APP_API_URL}cart/cart/add/${id}?userId=${userId}`;
      axios
        .put(url, { quantity: item.quantity + 1 })
        .then((res) => {
          toast.success("Quantity increased successfully", {
            autoClose: 1000,
          });
          setTrigger(!trigger);
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
      const url = `${process.env.REACT_APP_API_URL}cart/cart/remove/${id}?userId=${userId}`;
      axios
        .put(url, { quantity: item.quantity + 1 })
        .then((res) => {
          toast.success("Quantity decrease successfully", {
            autoClose: 1000,
          });
          setTrigger(!trigger);
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

  const initPay = (data: any, product: any) => {
    const order: any = {
      userId: userId,
      adminId: product.AdminId,
      productId: product.ProductId,
      name: product.name,
      image_url: product.image_url,
      quantity: product.quantity,
      price: product.price,
      order_id: data.id,
    };
    const options: any = {
      key: "rzp_test_5W5tkiV5AbJbDk",
      amount: data.amount * 100,
      currency: data.currency,
      name: data.name,
      description: "Test",
      image: data.img,
      order_id: data.id,
      handler: async function (response: any) {
        const id: any = product.id;
        toast.success("Payment Successful", {
          autoClose: 500,
        });
        const orderURL = `${process.env.REACT_APP_API_URL}order/${userId}`;
        axios.post(orderURL, order);
        const url = `${process.env.REACT_APP_API_URL}cart/cart/${id}`;
        axios.delete(url);
        setTrigger(!trigger);
        setCartProduct(cartProduct.filter((p: any) => p.id !== product.id));
      },
      prefill: {
        name: "Anirudh Jwala",
        email: "anirudh@gmail.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", () => {
      toast.error("Payment Failed", {
        autoClose: 500,
      });
    });
    rzp1.open();

    setTrigger(!trigger);
  };

  const handlePay = async (product: any) => {
    try {
      const orderURL = `${process.env.REACT_APP_API_URL}order/`;
      const data: any = await axios.post(orderURL, product);
      initPay(data.data.order, product);
      setTrigger(!trigger);
    } catch (error) {
      toast.error("Failed to place order", {
        autoClose: 500,
      });
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Cart Items */}
      {cartProduct.length !== 0 ? (
        <div className="space-y-6">
          {cartProduct.map((product: any) => (
            <div
              className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white"
              key={product.id}
            >
              {/* Product Image */}
              <img
                src={`${process.env.REACT_APP_API_URL}${product.image_url}`}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              {/* Product Details */}
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-900">
                  {product.name}
                </h2>
                <p className="text-gray-600">ID: {product.ProductId}</p>
                <p className="text-gray-700 mt-1">Price: ${product.price}</p>
                <div className="flex items-center mt-2">
                  <p className="text-gray-700">Quantity:</p>
                  <button
                    disabled={product.quantity === 1}
                    className={`ml-2 px-2 py-1 bg-gray-300 rounded-md ${
                      product.quantity === 1
                        ? "cursor-not-allowed"
                        : "hover:bg-gray-400"
                    } transition`}
                    onClick={() => removeHandler(product)}
                  >
                    <TiMinus />
                  </button>
                  <span className="mx-2">{product.quantity}</span>
                  <button
                    disabled={product.quantity === 10}
                    className={`ml-2 px-2 py-1 bg-gray-300 rounded-md ${
                      product.quantity === 10
                        ? "cursor-not-allowed"
                        : "hover:bg-gray-400"
                    } transition`}
                    onClick={() => addHandler(product)}
                  >
                    <TiPlus />
                  </button>
                </div>
                <p className="text-gray-500 mt-2">{product.description}</p>
              </div>
              {/* Action Buttons and Total */}
              <div className="ml-4 flex flex-col items-center">
                <button
                  onClick={() => handlePay(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 w-full mb-2 transition"
                >
                  Buy
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 w-full transition"
                >
                  Delete
                </button>
                <div className="mt-2 text-gray-700">
                  <span className="font-semibold">Total:</span> $
                  {product.quantity * product.price}
                </div>
              </div>
            </div>
          ))}
          {/* Cart Summary */}
          <div className="text-right mt-6">
            <span className="text-2xl font-bold text-white">
              Total: $ {count}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-20">
          <h1 className="text-4xl text-white">Your cart is empty</h1>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Link to="/user">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
