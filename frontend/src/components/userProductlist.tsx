import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPageCount, paginate } from "../Pagination";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const UserProductlist = () => {
  const [products, setProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const url = `http://localhost:5000/api/products`;
    axios.get(url).then((res) => {
      setProducts(res.data);
    });
  }, []);

  const currentItems = paginate(products, itemsPerPage, currentPage);
  const pageCount = getPageCount(products, itemsPerPage);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-white text-center font-bold mb-4">
          Product List
        </h1>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product: any) => (
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
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel={<FaChevronRight/> }
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel={<FaChevronLeft/> }  
          className="bg-white flex gap-5 justify-center"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default UserProductlist;
