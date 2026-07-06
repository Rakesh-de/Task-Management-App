// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import Loader from "../components/Loader";
// import EmptyState from "../components/EmptyState";
// import Modal from "../components/Modal";
// import ProjectCard from "../components/ProjectCard";
// import ProjectForm from "../components/ProjectForm";

// import API from "../services/api";

// import "../styles/dashboard.css";

// const Dashboard = () => {

//   const [projects, setProjects] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");

//   const [openModal, setOpenModal] = useState(false);

//   const [stats, setStats] = useState({

//     totalProjects: 0,

//     completedProjects: 0,

//     totalTasks: 0,

//   });

//   // ===========================
//   // Load Projects
//   // ===========================

//   const fetchProjects = async () => {

//     try {

//       const { data } = await API.get("/projects");

// console.log("Projects Response:", data);
// console.log("First Project:", data.projects[0]);
        
//       // const { data } = await API.get("/projects");

//        setProjects(data.projects || []);

//        setStats({

//         totalProjects: data.projects?.length || 0,

//         completedProjects:
//         data.projects?.filter(
//            (item) => item.status === "Completed"
//         ).length || 0,

//        totalTasks:
//         data.projects?.reduce(
//         (total, item) =>
//         total + (item.tasks?.length || 0),
//        0
//         ) || 0,

//       });

//     }

//     catch (error) {

//       console.log(error);

//     }

//     finally {

//       setLoading(false);

//     }

//   };

//   useEffect(() => {

//     fetchProjects();

//   }, []);

//   // ===========================
//   // Create Project
//   // ===========================

//   const createProject = async (project) => {

//     try {

//       const { data } = await API.post(

//         "/projects",

//         project

//       );

//       setProjects([

//         data.project,

//         ...projects,

//       ]);

//       setOpenModal(false);

//       fetchProjects();

//     }

//     catch (err) {

//       console.log(err);

//     }

//   };

//   // ===========================
//   // Search Projects
//   // ===========================

//   const filteredProjects = projects.filter((project) =>

//     project.title

//       .toLowerCase()

//       .includes(search.toLowerCase())

//   );

//   if (loading) {

//     return <Loader />;

//   }  return (
//     <div className="dashboard-container">

//       <Sidebar />

//       <div className="dashboard-content">

//         <Navbar />

//         <div className="dashboard-header">

//           <div>

//             <h1>Dashboard</h1>

//             <p>
//               Welcome to your Project Management System
//             </p>

//           </div>

//           <button
//             className="create-project-btn"
//             onClick={() => setOpenModal(true)}
//           >
//             + Create Project
//           </button>

//         </div>

//         {/* Dashboard Stats */}

//         <div className="dashboard-stats">

//           <div className="stat-card">

//             <h2>{stats.totalProjects}</h2>

//             <p>Total Projects</p>

//           </div>

//           <div className="stat-card">

//             <h2>{stats.completedProjects}</h2>

//             <p>Completed Projects</p>

//           </div>

//           <div className="stat-card">

//             <h2>{stats.totalTasks}</h2>

//             <p>Total Tasks</p>

//           </div>

//         </div>

//         {/* Search */}

//         <div className="dashboard-search">

//           <input
//             type="text"
//             placeholder="Search Project..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//         </div>

//         {/* Project List */}

//         {

//           filteredProjects.length === 0 ?

//           (

//             <EmptyState

//               title="No Projects Found"

//               message="Create your first project."

//             />

//           )

//           :

//           (

//             <div className="projects-grid">

//               {

//                 filteredProjects.map((project) => (

//                   <ProjectCard

//                     key={project._id}

//                     project={project}

//                   />

//                 ))

//               }

//             </div>

//           )

//         }

//         {/* Create Project Modal */}

//         <Modal

//           isOpen={openModal}

//           title="Create New Project"

//           onClose={() => setOpenModal(false)}

//         >

//           <ProjectForm

//             onSubmit={createProject}

//           />

//         </Modal>

//       </div>

//     </div>
//   );

// };

// export default Dashboard;


import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

import API from "../services/api";

import "../styles/dashboard.css";

const Dashboard = () => {

  // ===========================
  // Sidebar State
  // ===========================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ===========================
  // Dashboard State
  // ===========================

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [stats, setStats] = useState({

    totalProjects: 0,

    completedProjects: 0,

    totalTasks: 0,

  });

  // ===========================
  // Load Projects
  // ===========================

  const fetchProjects = async () => {

    try {

      const { data } = await API.get("/projects");

      console.log("Projects Response:", data);

      console.log("First Project:", data.projects[0]);

      setProjects(data.projects || []);

      setStats({

        totalProjects: data.projects?.length || 0,

        completedProjects:

          data.projects?.filter(

            (item) => item.status === "Completed"

          ).length || 0,

        totalTasks:

          data.projects?.reduce(

            (total, item) =>

              total + (item.tasks?.length || 0),

            0

          ) || 0,

      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchProjects();

  }, []);

  // ===========================
  // Create Project
  // ===========================

  const createProject = async (project) => {

    try {

      const { data } = await API.post(

        "/projects",

        project

      );

      setProjects([

        data.project,

        ...projects,

      ]);

      setOpenModal(false);

      fetchProjects();

    } catch (err) {

      console.log(err);

    }

  };

  // ===========================
  // Search Projects
  // ===========================

  const filteredProjects = projects.filter((project) =>

    project.title

      .toLowerCase()

      .includes(search.toLowerCase())

  );

  if (loading) {

    return <Loader />;

  }  return (
    <div className="dashboard-container">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="dashboard-content">

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="dashboard-header">

          <div>

            <h1>Dashboard</h1>

            <p>
              Welcome to your Project Management System
            </p>

          </div>

          <button
            className="create-project-btn"
            onClick={() => setOpenModal(true)}
          >
            + Create Project
          </button>

        </div>

        {/* Dashboard Stats */}

        <div className="dashboard-stats">

          <div className="stat-card">

            <h2>{stats.totalProjects}</h2>

            <p>Total Projects</p>

          </div>

          <div className="stat-card">

            <h2>{stats.completedProjects}</h2>

            <p>Completed Projects</p>

          </div>

          <div className="stat-card">

            <h2>{stats.totalTasks}</h2>

            <p>Total Tasks</p>

          </div>

        </div>

        {/* Search */}

        <div className="dashboard-search">

          <input
            type="text"
            placeholder="Search Project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Project List */}

        {
          filteredProjects.length === 0 ? (

            <EmptyState
              title="No Projects Found"
              message="Create your first project."
            />

          ) : (

            <div className="projects-grid">

              {filteredProjects.map((project) => (

                <ProjectCard
                  key={project._id}
                  project={project}
                />

              ))}

            </div>

          )
        }

        {/* Create Project Modal */}

        <Modal
          isOpen={openModal}
          title="Create New Project"
          onClose={() => setOpenModal(false)}
        >

          <ProjectForm
            onSubmit={createProject}
          />

        </Modal>

      </div>

    </div>
  );

};

export default Dashboard;