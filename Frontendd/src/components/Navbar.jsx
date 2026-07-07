import "./Navbar.css";
import { useAuth } from "../context/AuthContext";
import {  FaBell, FaSearch  } from "react-icons/fa";

const Navbar = ()=>{
    const { user } = useAuth();

   return (
    <header className="navbar">
        <div className="search-box">
            <FaSearch/>
            <input type="text" placeholder="Search projects..." />
        </div>

        <div className="navbar-right">
             <button className="notification-btn">
                <FaBell/>
             </button>

             <div className="profile-box">
                <img
                  src="https://ui-avatars.com/api/?name=User&background=2563eb&color=fff"
                   alt="profile"
                 />

                 <div>
                    <h4>{user?.name}</h4>
                    <span>{user?.email}</span>
                 </div>
             </div>                 
         </div>
            

             
       
    </header>
   );

};

export default Navbar;