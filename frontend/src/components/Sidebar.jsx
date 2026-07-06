// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FolderKanban,
//   User,
// } from "lucide-react";

// const Sidebar = () => {
//   return (
//     <aside className="sidebar">

//       <h2 className="sidebar-logo">
//         TaskFlow
//       </h2>

//       <nav>

//         <NavLink
//           to="/dashboard"
//           className="sidebar-link"
//         >
//           <LayoutDashboard size={20} />
//           Dashboard
//         </NavLink>

//         <NavLink
//           to="/project/1"
//           className="sidebar-link"
//         >
//           <FolderKanban size={20} />
//           Projects
//         </NavLink>

//         <NavLink
//           to="/profile"
//           className="sidebar-link"
//         >
//           <User size={20} />
//           Profile
//         </NavLink>

//       </nav>

//     </aside>
//   );
// };

// export default Sidebar;

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  User,
  X,
} from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

  return (
    <>

      <aside
        className={`sidebar ${sidebarOpen ? "show" : ""}`}
      >

        {/* Close Button (Only Mobile) */}

        <button
          className="close-sidebar"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={24} />
        </button>

        <h2 className="sidebar-logo">
          TaskFlow
        </h2>

        <nav>

          <NavLink
            to="/dashboard"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/project/1"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <FolderKanban size={20} />
            Projects
          </NavLink>

          <NavLink
            to="/profile"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <User size={20} />
            Profile
          </NavLink>

        </nav>

      </aside>

      {/* Overlay */}

      {sidebarOpen && (

        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>

      )}

    </>
  );

};

export default Sidebar;