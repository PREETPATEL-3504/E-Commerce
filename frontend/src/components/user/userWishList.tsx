import axios from "axios";
import { useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const UserWishList = () => {
  const [Razorpay] = useRazorpay();
  const [item, setItem] = useState<any>([]);
  const [trigger, setTrigger] = useState(false);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchItem();
  }, [trigger]);

  const fetchItem = async () => {
    const url = `${process.env.REACT_APP_API_URL}wishlist/${userId}`;
    const item = await axios.get(url);
    setItem(item?.data.result);
  };

  const initPay = (data: any, product: any) => {
    const order: any = {
      userId: userId,
      adminId: product.AdminId,
      productId: product.productId,
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
        toast.success("Payment Successful", {
          autoClose: 500,
        });
        toast.success("Order place Successfully", {
          autoClose: 500,
        });
        const orderURL = `${process.env.REACT_APP_API_URL}order/${userId}`;
        axios.post(orderURL, order);
        setItem(item?.filter((p: any) => p.id !== product.id));
        const url = `${process.env.REACT_APP_API_URL}wishlist/${product.id}`;
        axios.delete(url);
        setTrigger(!trigger);
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

  const handleDelete = async (id: any) => {
    const url = `${process.env.REACT_APP_API_URL}wishlist/${id}`;
    axios.delete(url).then(() => {
      toast.success("Item removed from wishlist successfully", {
        autoClose: 1000,
      });
    });
    setTrigger(!trigger);
  };

  return (
    <>
      <div className="mt-6 ml-6 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-4 ">
        {item?.length === 0 ? (
          <h1 className="text-xl text-white font-bold">Wishlist is empty !</h1>
        ) : (
          item?.map((item: any) => (
            <div
              key={item?.id}
              className="relative flex w-80 mt-6 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
              <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                <img
                  src={`${process.env.REACT_APP_API_URL}${item?.image_url}`}
                  alt="Product Image"
                  className="absolute inset-0 w-full h-full object-fit"
                />
              </div>

              <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {item?.name}
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  {item?.description}
                </p>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  $ {item?.price}
                </p>
              </div>
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handlePay(item)}
                  className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Buy
                </button>
                <button
                  onClick={() => handleDelete(item?.id)}
                  className="rounded-lg bg-blue-500 py-3 px-6 ml-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/user">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </>
  );
};
