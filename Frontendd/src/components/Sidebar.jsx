import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import {FaHome, FaUser,  FaProjectDiagram, FaSignOutAlt} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () =>{
    const { logout } = useAuth();

    return(
        <aside className="sidebar">
            <div className='logo'><h2>Task Flow</h2></div>

            <nav>
                <NavLink to="/dashboard" className="menu-link">
                    <FaHome/>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/Projects" className="menu-link">
                    <FaProjectDiagram/>
                    <span>Projects</span>
                </NavLink>

                <NavLink to="/profile" className="menu-link">
                    <FaUser/>
                    <span>Profile</span>
                </NavLink>                               
            </nav>

            <button className="logout-btn" onClick={logout}>
                <FaSignOutAlt/>
                Logout
            </button>

        </aside>
    );

};

export default Sidebar;