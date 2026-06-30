import { Link, useNavigate } from "react-router-dom";
import { Bell, UserCircle, LogOut } from "lucide-react";
import useAuth from "../hooks/useAuth";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>TaskFlow</h2>
      </div>

      <div className="navbar-right">

        <button className="icon-btn">
          <Bell size={20} />
        </button>

        <Link to="/profile" className="profile-link">
          <UserCircle size={24} />
          <span>{user?.name}</span>
        </Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;