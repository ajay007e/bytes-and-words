import { useState } from "react";

export default function Pagination({ data, itemsPerPage = 5, headingRequired = true, RenderComponent }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // calculate which 3 page buttons to show
  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + 2);

    if (end - start < 2) {
      start = Math.max(1, end - 2);
    }

    return [...Array(end - start + 1)].map((_, i) => start + i);
  };

  return (
    <div className="container mx-auto mt-12 px-8">
      {/* Pagination Heading */}
      {headingRequired && 
        (<h2 className="text-left text-lg font-semibold my-4 text-gray-700">
          Browse More Blogs
        </h2>)
      }
      
      {/* Render Items */}
      <div className="space-y-6 mb-8">
        {currentItems.map((item, index) => <RenderComponent key = {item.id} blog = {item}/>)}
      </div>


      {/* Pagination Controls */}
      <div className="flex justify-center gap-2">
        {/* First */}
        <button
          className="px-3 py-1 rounded-md border bg-gray-400 hover:bg-gray-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => changePage(1)}
          disabled={currentPage === 1}
        >
          First
        </button>

        {/* Prev */}
        <button
          className="px-3 py-1 rounded-md border bg-gray-400 hover:bg-gray-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => changePage(num)}
            className={`px-3 py-1 rounded-md border cursor-pointer ${
              currentPage === num
                ? "bg-gray-700 text-white font-bold"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            {num}
          </button>
        ))}

        {/* Next */}
        <button
          className="px-3 py-1 rounded-md border bg-gray-400 hover:bg-gray-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        {/* Last */}
        <button
          className="px-3 py-1 rounded-md border bg-gray-400 hover:bg-gray-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => changePage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}
