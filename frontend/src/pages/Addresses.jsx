import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Addresses.css";

function Addresses() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") ) || {};
  useEffect(() => { fetchAddresses(); }, []);

  const fetchAddresses = async () => {
    try {
      const res = await API.get(
        `/address/${user.email}`
      );
      setAddresses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(
        `/address/${id}`
      );

      fetchAddresses();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      

      <div className="address-page">

       <div className="address-header">

  <h1>📍 Saved Addresses</h1>

  <button
    className="add-btn"
    onClick={() =>
      navigate("/add-address")
    }
  >
    + Add New Address
  </button>

</div>

        <div className="address-grid">

          {addresses.length === 0 ? (

            <div className="empty-address">

              <h3>
                No Addresses Found
              </h3>

              <p>
                Add your first address
              </p>

            </div>

          ) : (

            addresses.map((item) => (

              <div
                className="address-card"
                key={item._id}
              >

                <div className="address-type">

                  {item.label === "Home"
                    ? "🏠"
                    : item.label === "Work"
                    ? "💼"
                    : "🏢"}

                  <span>
                    {item.label}
                  </span>

                </div>

                <h3>
                  {item.fullName}
                </h3>

                <p>
                  📞 {item.phone}
                </p>

                <p>
                  📍 {item.address}
                </p>

                <p>
                  {item.city} - {item.pincode}
                </p>

                <div className="address-actions">

                  <button
                    className="edit-btn"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(item._id)
                    }
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Addresses;