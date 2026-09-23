import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import API from "../api/axios";
import "./AddAddress.css";

function AddAddress() {
  const navigate = useNavigate();
  const user =JSON.parse(localStorage.getItem("user")) || {};
  const [formData, setFormData] = useState({
    userEmail: user.email,
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    label: "Home",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/address/add",
        formData
      );
      alert("Address Added Successfully");
      navigate("/addresses");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Address");
    }
  };

  return (
    <>
      <div className="add-address-page">
        <div className="address-card">
          <h1>Add New Address</h1>
          <p>Save your delivery address </p>
          <form onSubmit={handleSave}>
            <div className="form-grid">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="address"
                placeholder="House No, Street, Area"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>
            <h3>Address Type</h3>
            <div className="label-buttons">
              <button type="button"
                className={formData.label === "Home"? "active"  : "" }
                onClick={() => setFormData({ ...formData,   label: "Home",  }) }>
                🏠 Home
              </button>
              <button
                type="button"
                className={ formData.label === "Work" ? "active" : "" }
                onClick={() =>setFormData({   ...formData, label: "Work",   }) }   >
                💼 Work
              </button>
              <button  type="button"
                className={ formData.label === "Hostel"  ? "active"   : ""   }
                onClick={() => setFormData({ ...formData,label: "Hostel",   }) }   >
                🏫 Hostel
              </button>
            </div>
            <button type="submit" className="save-address-btn" >
              Save Address
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddAddress;