import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import "../styles/auth.css";

const Login = () => {

  const { login } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await login(formData.email, formData.password);

      toast.success("Login Successful");

      navigate("/dashboard");

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Login Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p>Login to continue</p>

        <form onSubmit={handleSubmit}>

          <input

            type="email"

            name="email"

            placeholder="Email"

            value={formData.email}

            onChange={handleChange}

            required

          />

          <input

            type="password"

            name="password"

            placeholder="Password"

            value={formData.password}

            onChange={handleChange}

            required

          />

          <button
            type="submit"
            disabled={loading}
          >

            {

              loading

                ? "Please Wait..."

                : "Login"

            }

          </button>

        </form>

        <p>

          Don't have an account?

          <Link to="/register">

            Register

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Login;