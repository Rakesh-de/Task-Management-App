import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  User,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <h2 className="sidebar-logo">
        TaskFlow
      </h2>

      <nav>

        <NavLink
          to="/dashboard"
          className="sidebar-link"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/project/1"
          className="sidebar-link"
        >
          <FolderKanban size={20} />
          Projects
        </NavLink>

        <NavLink
          to="/profile"
          className="sidebar-link"
        >
          <User size={20} />
          Profile
        </NavLink>

      </nav>

    </aside>
  );
};

export default Sidebar;