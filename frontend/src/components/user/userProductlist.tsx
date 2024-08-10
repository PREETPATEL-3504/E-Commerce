import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setProductList } from "../../store/reducers/productList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TbShoppingCartHeart } from "react-icons/tb";

const UserProductlist = () => {
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [productId, setProductId] = useState<any>([]);
  const [itemAdd, setItemAdd] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const itemsPerPage = 10;
  const UserId = localStorage.getItem("id");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const socket = useAppSelector((store) => store.users.socket);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (socket) {
      socket.on("product", (Newproduct: any) => {
        setProducts((prevProducts: any) => [...prevProducts, Newproduct]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("delete", (updatedProduct: any) => {
        console.log("Deleted product received:", updatedProduct);
        const data = products.filter(
          (product: any) => product.id != updatedProduct
        );
        setProducts(data);
      });
    }
  }, [products]);

  useEffect(() => {
    if (socket) {
      socket.on("update", (updatedProduct: any) => {
        const data = products.map((product: any) =>
          product.id == updatedProduct.id ? updatedProduct : product
        );
        setProducts(data);
      });
    }
  }, [socket, products]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}product/products?offset=${
      offset * itemsPerPage
    }&limit=${itemsPerPage}`;
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setProductList(res));
        setProducts(res.data.data);
        setTotalProductsCount(res.data.total);
      });
  }, [currentPage, socket]);
  const totalPages = Math.ceil(totalProductsCount / itemsPerPage);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}cart/cart?UserId=${UserId}`;
    axios.get(url).then((res) => {
      const p_id = res.data.data;
      for (let i = 0; i < p_id.length; i++) {
        productId.push(...productId, res.data.data[i].ProductId);
      }
    });
  }, [itemAdd]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}cart/cart/count?UserId=${UserId}`;
    axios.get(url).then((res) => {
      setItemCount(res.data.data);
    });
  }, [itemAdd]);

  const cartHandler = (item: any) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}cart/cart?UserId=${UserId}`;
      axios.post(url, item).then((res) => {
        toast.success("Add to cart successfully", {
          autoClose: 1000,
        });
        setItemAdd(!itemAdd);
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart", {
        autoClose: 1000,
      });
    }
  };



  return (
    <>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Product List</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/user-order")}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Orders
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <IoCart className="text-2xl" />
              <span className="ml-2 text-lg font-semibold">{itemCount}</span>
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center bg-gray-800 text-white  rounded-lg hover:bg-gray-700 transition"
            >
              <TbShoppingCartHeart className="text-2xl" />
              <span className="text-lg font-semibold">{itemCount}</span>
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-6 py-3 text-left">Name</th>
                <th className="border px-6 py-3 text-right">Price</th>
                <th className="border px-6 py-3 text-right">Quantity</th>
                <th className="border px-6 py-3 text-center">Image</th>
                <th className="border px-6 py-3">Description</th>
                <th className="border px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="border px-6 py-4">{product.name}</td>
                  <td className="border px-6 py-4 text-right">
                    ${product.price}
                  </td>
                  <td className="border px-6 py-4 text-right">
                    {product.quantity}
                  </td>
                  <td className="border px-6 py-4 text-center">
                    <img
                      src={`${process.env.REACT_APP_API_URL}${product.image_url}`}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="border px-6 py-4">{product.description}</td>
                  <td className="border px-6 py-4 text-center">
                    <button
                      className={`bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition ${
                        productId.includes(product.id)
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                      disabled={productId.includes(product.id)}
                      onClick={() => cartHandler(product)}
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {/* <Pagination totalPages={totalPages}/> */}

        <div className="flex justify-center mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(currentPage - 1);
              setOffset(offset - 1);
            }}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l-lg hover:bg-gray-400 transition disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 mx-2 rounded-lg">
            {currentPage}
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage(currentPage + 1);
              setOffset(offset + 1);
            }}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r-lg hover:bg-gray-400 transition disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProductlist;
