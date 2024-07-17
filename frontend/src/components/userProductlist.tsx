import axios from "axios";
import React, { useEffect } from "react";
import { getPageCount, paginate } from "../Pagination";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { useAppDispatch } from "../Store/Hooks";
import { setProductList } from "../Store/Reducers/ProduceList";

const UserProductlist = () => {
  const [products, setProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalProductsCount, setTotalProductsCount] = React.useState(0);
  const itemsPerPage = 5;

  const dispatch = useAppDispatch();
  dispatch(setProductList(products));

  useEffect(() => {
    const url = `http://localhost:5000/api/products?offset=${
      currentPage * itemsPerPage
    }&limit=${itemsPerPage}`;
    axios.get(url).then((res) => {
      setProducts(res.data.data);
      setTotalProductsCount(res.data.total);
    });
  }, [currentPage]);
  const totalPages = Math.ceil(totalProductsCount / itemsPerPage);

  const cartHandler = (id:any) => {
    console.log("=======Product add to cart=========");
    console.log(id);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex items-end mb-4">
          <h1 className="text-2xl text-white text-center font-bold  ">
            Product List
          </h1>
          <h4 className="text-white text-center ml-[25%] font-bold">
            Your Cart
          </h4>
        </div>

        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
          
          
            {products.map((product: any) => (
              <tr key={product.id} className="bg-white">
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">
                  <img
                    src={`http://localhost:5000/${product.image_url}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => {
                      cartHandler(product);
                    }}
                  >
                    {"        "}
                    <IoCart className="text-3xl" />{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded mr-2 hover:bg-gray-400"
          >
            <FaChevronLeft />
          </button>

          <button className="px-2 py-1 rounded mr-2  bg-blue-500 text-white">
            {currentPage}
          </button>

          <button
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-gray-300  text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProductlist;
