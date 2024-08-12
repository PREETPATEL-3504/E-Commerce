import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AdminProductlist = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const adminid = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalProductsCount / itemsPerPage);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}product/products?offset=${
      offset * itemsPerPage
    }&limit=${itemsPerPage}&AdminId=${adminid}`;
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setProducts(res.data.data);
        setTotalProductsCount(res.data.total);
      });
  }, [offset]);

  const onDelete = (id: any) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}product/products/${id}`, {
        headers: { Authorization: token },
      })
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
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Product List
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-center  font-semibold text-gray-600">
                Name
              </th>
              <th className="py-3 px-4 text-center  font-semibold text-gray-600">
                Price
              </th>
              <th className="py-3 px-4 text-center  font-semibold text-gray-600">
                Quantity
              </th>
              <th className="py-3 px-4 text-center  font-semibold text-gray-600">
                Image
              </th>
              <th className="py-3 px-4 text-center font-semibold text-gray-600">
                Description
              </th>
              <th className="py-3 px-4 text-center font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-700">{product.name}</td>
                <td className="py-4 px-4 text-gray-700 text-right">
                  ${product.price}
                </td>
                <td className="py-4 px-4 text-gray-700 text-right">
                  {product.quantity}
                </td>
                <td className="py-4 px-4 flex justify-center">
                  <img
                    src={`${process.env.REACT_APP_API_URL}${product.image_url}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-4 px-4 text-gray-700">
                  {product.description}
                </td>
                <td className="py-4 px-4 text-center">
                  <Link to={`/add-product/${product.id}`}>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-700 transition">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  );
};

export default AdminProductlist;
