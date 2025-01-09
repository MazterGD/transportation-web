import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShowCustomer from "./Posts/Show";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [summary, setSummary] = useState({
    customersCount: 0,
    invoicesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  async function getPosts() {
    const res = await fetch("/api/v1/invoices");
    const data = await res.json();

    if (res.ok) {
      setPosts(data);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      try {
        const res = await fetch("/api/summary");
        const data = await res.json();

        if (res.ok) {
          setSummary(data);
        } else {
          console.error("Failed to fetch summary:", data);
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  return (
    <>
      <div className="home-container">
        <h1 className="title">Ticket Dashboard</h1>

        {loading ? (
          <p>Loading summary...</p>
        ) : (
          <>
            <div className="flex space-x-10 card-container">
              <div className="card">
                <p>Total Customers</p>
                <h2 className="font-bold text-2xl">{summary.customersCount}</h2>
              </div>
              <div className="card">
                <p>Total Invoices</p>
                <h2 className="font-bold text-2xl">{summary.invoicesCount}</h2>
              </div>
            </div>
          </>
        )}
      </div>

      <div class="flex space-x-10 create-button">
        <Link to={`/create`} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Create New Customer</span>
        </Link>

        <Link to={`/createInvoice`} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Create New Invoice</span>
        </Link>
      </div>
    </>
  );
}