import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function ShowInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);

  const [invoice, setInvoice] = useState(null);

  async function getInvoice() {
    const res = await fetch(`/api/v1/invoices/${id}`);
    const data = await res.json();

    if (res.ok) {
      setInvoice(data.data);
      console.log(data);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (user) {
      const res = await fetch(`/api/v1/invoices/${id}`, {
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
    getInvoice();
  }, []);

  return (
    <>
      {invoice ? (
        <div className="mt-4 p-4 border rounded-md border-dashed border-slate-400 bg-gray-100">
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
            <p>Amount: ${invoice.amount.toFixed(2)}</p>
          </div>
        </div>
      
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white text-sm rounded-lg px-3 py-1"
          >
            Back
          </button>
          <form onSubmit={handleDelete}>
            <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">
              Delete
            </button>
          </form>
        </div>
      </div>
      
      ) : (
        <p className="title">Invoice not found!</p>
      )}
    </>
  );
}
