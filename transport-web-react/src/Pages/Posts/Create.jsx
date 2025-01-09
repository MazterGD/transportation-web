import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();

    const res = await fetch("/api/v1/customers", {
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
      <h1 className="title">Create a new customer</h1>

      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>

        {/* Type */}
        <div>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Customer Type
            </option>
            <option value="I">Individual (I)</option>
            <option value="G">Group (G)</option>
          </select>
          {errors.type && <p className="error">{errors.type[0]}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Customer Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>

        {/* Address */}
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && <p className="error">{errors.address[0]}</p>}
        </div>

        {/* City */}
        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
          />
          {errors.city && <p className="error">{errors.city[0]}</p>}
        </div>

        {/* State */}
        <div>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
          />
          {errors.state && <p className="error">{errors.state[0]}</p>}
        </div>

        {/* Postal Code */}
        <div>
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
          {errors.postalCode && <p className="error">{errors.postalCode[0]}</p>}
        </div>

        <button className="primary-btn">Create</button>
      </form>
      {console.log(formData)}
    </>
  );
}
