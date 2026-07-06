import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {

  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({

    name: user?.name || "",

    email: user?.email || "",

    role: user?.role || "Member",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    toast.success("Profile Updated Successfully");

  };

  return (

    <div className="dashboard-container">

      <div className="dashboard-content">

        <div className="profile-card">

          <div className="profile-top">

            <div className="avatar">
              {formData.name?.charAt(0).toUpperCase()}
            </div>

            <h2>{formData.name}</h2>

            <p>{formData.email}</p>

          </div>

          <form
            className="profile-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">

              <label>Name</label>

              <input

                type="text"

                name="name"

                value={formData.name}

                onChange={handleChange}

              />

            </div>

            <div className="form-group">

              <label>Email</label>

              <input

                type="email"

                name="email"

                value={formData.email}

                onChange={handleChange}

              />

            </div>

            <div className="form-group">

              <label>Role</label>

              <input

                type="text"

                name="role"

                value={formData.role}

                disabled

              />

            </div>

            <button
              className="save-btn"
              type="submit"
            >
              Save Changes
            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default Profile;