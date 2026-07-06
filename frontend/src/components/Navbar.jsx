// import { Link, useNavigate } from "react-router-dom";
// import { Bell, UserCircle, LogOut } from "lucide-react";
// import useAuth from "../hooks/useAuth";
// import "../styles/navbar.css";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <h2>TaskFlow</h2>
//       </div>

//       <div className="navbar-right">

//         <button className="icon-btn">
//           <Bell size={20} />
//         </button>

//         <Link to="/profile" className="profile-link">
//           <UserCircle size={24} />
//           <span>{user?.name}</span>
//         </Link>

//         <button
//           className="logout-btn"
//           onClick={handleLogout}
//         >
//           <LogOut size={18} />
//           Logout
//         </button>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  UserCircle,
  LogOut,
  Menu,
} from "lucide-react";

import useAuth from "../hooks/useAuth";
import "../styles/navbar.css";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <nav className="navbar">

      <div className="navbar-left">

        {/* Hamburger Menu */}

        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>

        <div className="navbar-logo">

          <h2>TaskFlow</h2>

        </div>

      </div>

      <div className="navbar-right">

        <button className="icon-btn">

          <Bell size={20} />

        </button>

        <Link
          to="/profile"
          className="profile-link"
        >

          <UserCircle size={24} />

          <span>{user?.name}</span>

        </Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          <LogOut size={18} />

          <span>Logout</span>

        </button>

      </div>

    </nav>

  );

};

export default Navbar;