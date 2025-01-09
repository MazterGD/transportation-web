import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function getInvoices(page = 1) {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/invoices?page=${page}`);
      const response = await res.json();

      if (res.ok) {
        setInvoices(response.data);
        setCurrentPage(response.meta.current_page);
        setLastPage(response.meta.last_page);
      }
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getInvoices(currentPage);
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
      <h1 className="title">Invoices</h1>
      {loading ? (
        <p>Loading...</p>
      ) : invoices.length > 0 ? (
        <>
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="mb-4 p-4 border rounded-md border-dashed border-slate-400"
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-2xl">Invoice #{invoice.id}</h2>
                  <small className="text-xs text-slate-600">
                    Billed Date: {new Date(invoice.billedDate).toLocaleString()}
                  </small>
                  <br />
                  <small className="text-xs text-slate-600">
                    Paid Date:{" "}
                    {invoice.paidDate
                      ? new Date(invoice.paidDate).toLocaleString()
                      : "Not Paid"}
                  </small>
                  <br />
                  <small className="text-xs text-slate-600">
                    Customer ID: {invoice.customerId}
                  </small>
                  <br />
                  <small className="text-xs text-slate-600">
                    Status: {invoice.status}
                  </small>
                </div>
                <Link
                  to={`/invoices/${invoice.id}`}
                  className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
                >
                  View Details
                </Link>
              </div>
              <p>Amount: ${invoice.amount.toFixed(2)}</p>
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
        <p>There are no invoices</p>
      )}
    </>
  );
}
