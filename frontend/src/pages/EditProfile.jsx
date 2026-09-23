import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import API from "../api/axios";
import "./EditProfile.css";
function EditProfile() {
  const navigate = useNavigate();

    const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const [preview, setPreview] =
    useState(
      user.profilePic || ""
    );
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    gender: user.gender || "",
    dob: user.dob || "",
    address: user.address || "",
    city: user.city || "",
    pincode: user.pincode || "",
    about: user.about || "",
    profilePic: user.profilePic || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleImage = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  const imageUrl =
    URL.createObjectURL(file);

  setPreview(imageUrl);

  setFormData({
    ...formData,
    profilePic: imageUrl,
  });

};
  const handleSave = async () => {
    try {
      const res = await API.put(
        "/users/update-profile",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Profile Updated Successfully");

      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <>
      <div className="edit-page">

        <div className="edit-header">

          <button
            className="back-btn"
            onClick={() => navigate("/profile")}
          >
            ←
          </button>

          <div>
            <h1>Edit Profile</h1>
            <p>
              Update your personal information
            </p>
          </div>

        </div>

        <div className="edit-card">

          {/* LEFT */}

         <div className="left-section">

  <h3>Profile Picture</h3>

  <img
    src={
      preview ||
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    }
    alt="profile"
    className="profile-img"
  />

  <label
    htmlFor="profile-upload"
    className="photo-btn"
  >
    📷 Change Photo
  </label>

  <input
    id="profile-upload"
    type="file"
    accept="image/*"
    capture="user"
    hidden
    onChange={handleImage}
  />

  <div className="tips-box">

    <h4>Profile Tips</h4>

    <ul>

      <li>
        Use a clear profile photo
      </li>

      <li>
        Keep contact details updated
      </li>

      <li>
        Add delivery address
      </li>

      <li>
        Complete your profile
      </li>

    </ul>

  </div>

</div>

          {/* RIGHT */}

          <div className="right-section">

            <div className="form-grid">

              <div>
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Gender</label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label>Date Of Birth</label>

                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Address</label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>

            </div>

           

            <div className="btn-row">

              <button
                className="cancel-btn"
                onClick={() =>
                  navigate("/profile")
                }
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default EditProfile;