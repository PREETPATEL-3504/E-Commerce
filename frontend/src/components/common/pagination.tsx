// export const paginate = (items: any, itemsPerPage: any, currentPage: any) => {
//   const start = currentPage * itemsPerPage;
//   const end = start + itemsPerPage;
//   return items.slice(start, end);
// };
// export const getPageCount = (items: any, itemsPerPage: any) => {
//   return Math.ceil(items.length / itemsPerPage);
// };

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({totalPages}:any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);


  return (
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
  )
}

export default Pagination