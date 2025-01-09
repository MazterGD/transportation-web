import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function CreateInvoices() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    customerId: "",
    amount: "",
    status: "",
    billedDate: "",
    paidDate: "",
  });

  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();

    const res = await fetch("/api/v1/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      console.log(data.errors);
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <>
      <h1 className="title">Create a new invoice</h1>

      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        {/* Customer ID */}
        <div>
          <input
            type="text"
            name="customerId"
            placeholder="Customer ID"
            value={formData.customerId}
            onChange={handleInputChange}
          />
          {errors.customerId && <p className="error">{errors.customerId[0]}</p>}
        </div>

        {/* Amount */}
        <div>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
          {errors.amount && <p className="error">{errors.amount[0]}</p>}
        </div>

        {/* Status */}
        <div>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="B">Billed (B)</option>
            <option value="P">Paid (P)</option>
          </select>
          {errors.status && <p className="error">{errors.status[0]}</p>}
        </div>

        {/* Billed Date */}
        <div>
          <input
            type="datetime-local"
            name="billedDate"
            placeholder="Billed Date"
            value={formData.billedDate}
            onChange={handleInputChange}
          />
          {errors.billedDate && <p className="error">{errors.billedDate[0]}</p>}
        </div>

        {/* Paid Date */}
        <div>
          <input
            type="datetime-local"
            name="paidDate"
            placeholder="Paid Date"
            value={formData.paidDate}
            onChange={handleInputChange}
          />
          {errors.paidDate && <p className="error">{errors.paidDate[0]}</p>}
        </div>

        <button className="primary-btn">Create</button>
      </form>
      {console.log(formData)}
    </>
  );
}
