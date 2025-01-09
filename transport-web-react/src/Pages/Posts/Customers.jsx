import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function getCustomers(page = 1) {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/customers?page=${page}`);
      const response = await res.json();

      if (res.ok) {
        setCustomers(response.data);
        setCurrentPage(response.meta.current_page);
        setLastPage(response.meta.last_page);
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCustomers(currentPage);
  }, [currentPage]);

  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  }

  function getVisiblePages() {
    const pages = [];
    const range = 3; // Number of pages to show before and after the current page

    for (let i = Math.max(1, currentPage - range); i <= Math.min(lastPage, currentPage + range); i++) {
      pages.push(i);
    }

    return pages;
  }

  return (
    <>
      <h1 className="title">Customers</h1>
      {loading ? (
        <p>Loading...</p>
      ) : customers.length > 0 ? (
        <>
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="mb-4 p-4 border rounded-md border-dashed border-slate-400"
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-2xl">Customer #{customer.id}</h2>
                  <small className="text-xs text-slate-600">
                    Name: {customer.name}
                  </small>
                  <br />
                  <small className="text-xs text-slate-600">
                    City: {customer.city}
                  </small>
                  <br />
                  <small className="text-xs text-slate-600">
                    Type: {customer.type}
                  </small>
                </div>
                <Link
                  to={`/customers/${customer.id}`}
                  className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
                >
                  View Details
                </Link>
              </div>
              <p>Postal Code: {customer.postalCode}</p>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 gap-2">
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>

            {getVisiblePages().map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded-md ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === lastPage
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={currentPage === lastPage}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>There are no customers</p>
      )}
    </>
  );
}
