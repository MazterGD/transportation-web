import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function ShowCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);

  const [customer, setCustomer] = useState(null);

  async function getCustomer() {
    const res = await fetch(`/api/v1/customers/${id}?includeInvoices=true`);
    const data = await res.json();

    if (res.ok) {
      setCustomer(data.data);
      console.log(data);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (user) {
      const res = await fetch(`/api/v1/customers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      }

      console.log(data);
    }
  }

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <>
      {customer ? (
        <div className="mt-4 p-4 border rounded-md border-dashed border-slate-400">
          <div className="mb-4">
            <h2 className="font-bold text-2xl">{customer.name}</h2>
            <p>
              <span className="font-bold">ID:</span> {customer.id}
            </p>
            <p>
              <span className="font-bold">Email:</span> {customer.email}
            </p>
            <p>
              <span className="font-bold">Type:</span> {customer.type}
            </p>
            <p>
              <span className="font-bold">Address:</span> {customer.address},{" "}
              {customer.city}, {customer.state}, {customer.postalCode}
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Link
              to={`/customers/update/${customer.id}`}
              className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
            >
              Update
            </Link>

            <form onSubmit={handleDelete}>
              <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">
                Delete
              </button>
            </form>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-2">Invoices</h3>
            {customer.invoices.length > 0 ? (
              <ul className="space-y-4">
                {customer.invoices.map((invoice) => (
                  <li
                    key={invoice.id}
                    className="p-4 bg-gray-100 rounded-md shadow-sm"
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
                        <p>Amount: ${invoice.amount.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Link
                        to={`/invoices/${invoice.id}`}
                        className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
                      >
                        View More
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No invoices available for this customer.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="title">Customer not found!</p>
      )}
    </>
  );
}
