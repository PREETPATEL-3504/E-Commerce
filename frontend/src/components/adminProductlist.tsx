import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../Store/Hooks";
import { setProductList } from "../Store/Reducers/ProduceList";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AdminProductlist = () => {
  const [products, setProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalProductsCount, setTotalProductsCount] = React.useState(0);
  const itemsPerPage = 2;

  const dispatch = useAppDispatch();
  dispatch(setProductList(products));

  useEffect(() => {
    const url = `http://localhost:5000/api/products?offset=${
      currentPage * itemsPerPage
    }&limit=${itemsPerPage}`;
    axios.get(url).then((res) => {
      setProducts(res.data.data);
      setTotalProductsCount(res.data.total);
      console.log();
    });
  }, [currentPage]);
  
  const totalPages = Math.ceil(totalProductsCount / itemsPerPage);
  
  //Products Delete Api
  const onDelete = (id: any) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((p: any) => p.id !== id));
        toast.success("Product deleted", {
          autoClose: 1000,
        });
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="container bg-black-300 mx-auto p-4 h-full">
      <h1 className="text-2xl text-white text-center font-bold mb-4">
        Product List
      </h1>

      <table className="w-full  border border-gray-300 rounded-3xl p-9 mb-5">
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
                  src={product.image_url}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  <Link to={`/add-product/${product.id}`}>Edit</Link>
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
  );
};

export default AdminProductlist;
