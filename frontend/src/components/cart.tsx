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

  const UserId = localStorage.getItem("id");

  const onDelete = (product: any) => {
    const id = product.id;
    const url = `http://localhost:5000/cart/cart/${id}`;
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
      const url = `http://localhost:5000/cart/cart/add/${id}?UserId=${UserId}`;
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
      const url = `http://localhost:5000/cart/cart/remove/${id}?UserId=${UserId}`;
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

  const initPay = (data: any, id: any) => {
    const options = {
      key: "rzp_test_5W5tkiV5AbJbDk",
      amount: data.amount,
      currency: data.currency,
      name: data.name,
      description: "Test",
      image: data.img,
      order_id: data.id,
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();

    setTrigger(!trigger);
  };

  const handlePay = async (product: any, id: any) => {
    try {
      const orderURL = `http://localhost:5000/order/${UserId}`;
      const data: any = await axios.post(orderURL, product);
      initPay(data.data.order, id);
    } catch (error) {
      toast.error("Failed to place order", {
        autoClose: 500,
      });
    }
  };

  useEffect(() => {
    const url = `http://localhost:5000/cart/cart?UserId=${UserId}`;
    axios.get(url).then((res) => {
      setCartProduct(res.data.data);
      const total = res.data.data.reduce(
        (acc: any, product: any) => acc + product.price * product.quantity,
        0
      );
      setCount(total);
    });
  }, [trigger]);

  return (
    <>
      {cartProduct.length !== 0 ? (
        cartProduct.map((product: any) => (
          <>
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
                <p className="text-gray-600">ID: {product.ProductId}</p>
                <p className="text-gray-700 mt-1">Price: {product.price} $</p>

                <p className="text-gray-700 mt-1 flex gap-2 items-center">
                  Quantity:{" "}
                  <button
                    disabled={product.quantity == 1}
                    className={
                      product.quantity === 1 ? "cursor-not-allowed" : ""
                    }
                    onClick={() => {
                      removeHandler(product);
                    }}
                  >
                    <TiMinus />
                  </button>
                  {product.quantity}
                  <button
                    disabled={product.quantity == 10}
                    className={
                      product.quantity === 10 ? "cursor-not-allowed" : ""
                    }
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
                <button
                  onClick={() => handlePay(product, product.id)}
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
                <div className="mt-2">
                  <span className="font-bold">Total:</span>
                  <span className="ml-1">
                    {product.quantity * product.price} $
                  </span>
                </div>
              </div>
            </div>
            <div className="font-bold text-black ml-4 bg-white rounded-lg p-2 mr-4 text-end">
              <span className="p-2">Total: {count} $</span>
            </div>
          </>
        ))
      ) : (
        <>
          <div className="flex justify-center items-center mt-[15%] ">
            <h1 className="text-5xl text-white">Your cart is empty</h1>
          </div>
        </>
      )}

      <button className="bg-white p-4 m-4 rouded-xl rounded-lg">
        <Link to="/user">Continue Shopping</Link>
      </button>
    </>
  );
};

export default Cart;
