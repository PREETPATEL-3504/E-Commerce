import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import useRazorpay from "react-razorpay";
import env from "react-dotenv";

const Cart = () => {
  console.log("------", process.env.API);
  
  const [Razorpay] = useRazorpay();
  const [cartProduct, setCartProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [trigger, setTrigger] = useState(false);

  const UserId = localStorage.getItem("id");

  const onDelete = (product: any) => {
    const id = product.id;
    const url = `${env.API}cart/cart/${id}`;
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
      const url = `${env.API}cart/cart/add/${id}?UserId=${UserId}`;
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
      const url = `${env.API}cart/cart/remove/${id}?UserId=${UserId}`;
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

  const initPay = (data: any, id: any, product:any) => {
    const order:any = {
      userId: UserId,
      adminId: product.AdminId,
      productId: product.ProductId,
      name: product.name,
      image_url: product.image_url,
      quantity: product.quantity,
      price: product.price,
      order_id: data.id,
    }
    const options = {
      key: "rzp_test_5W5tkiV5AbJbDk",
      amount: data.amount,
      currency: data.currency,
      name: data.name,
      description: "Test",
      image: data.img,
      order_id: data.id,
      handler: async function(response: any) {        
          toast.success("Payment Successful", {
            autoClose: 500,
          });
          const orderURL = `${env.API}order/${UserId}`;
          axios.post(orderURL, order);
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

  const handlePay = async (product: any, id: any) => {
    try {
      const orderURL = `${env.API}order/`;
      const data: any = await axios.post(orderURL, product);
      initPay(data.data.order, id, product);
    } catch (error) {
      toast.error("Failed to place order", {
        autoClose: 500,
      });
    }
  };

  useEffect(() => {
    const url = `${env.API}cart/cart?UserId=${UserId}`;
    axios.get(url).then((res:any) => {
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
                src={`process.env.${product.image_url}`}
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
