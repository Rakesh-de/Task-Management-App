import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/Loader";


import DeleteModal from "../components/DeleteModal";
import api from "../services/api";
import './Dashboard.css';
import ProjectModal from "../components/ProjectModal";
const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);


  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);


  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.projects);
    } catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // const deleteProject = async (project) => {
  //   if (!window.confirm(`Are you sure you want to delete the project "${project.name}"?`)) {
  //     return;
  //   }
  //   try {
  //     await api.delete(`/projects/${project._id}`);
  //     loadProjects(); // loadprojects() me hi set projects h
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const deleteProject = (project) => {
    setDeleteProjectId(project._id);
    setDeleteOpen(true);
  };


  const editProject = (project) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/projects/${deleteProjectId}`);

      setDeleteOpen(false);
      setDeleteProjectId(null);

      loadProjects();
    } catch (err) {
      console.log(err);
    }
  };




  return (
    <>
      <Sidebar />

      <div className="dashboard">

        <Navbar />

        <div className="dashboard-container">

          <div className="dashboard-header">

            <div>
              <h1>Dashboard</h1>
              <p>Manage your projects efficiently</p>
            </div>

            <button
              className="create-btn"
              onClick={() => {
                setSelectedProject(null);
                setOpenModal(true);
              }}
            >
              + New Project
            </button>

          </div>

          <div className="stats-grid">

            <StatsCard
              title="Projects"
              value={projects.length}
              color="#2563eb"
            />

            <StatsCard
              title="Completed"
              value="0"
              color="#10b981"
            />

            <StatsCard
              title="In Progress"
              value="0"
              color="#f59e0b"
            />

            <StatsCard
              title="Pending"
              value="0"
              color="#ef4444"
            />

          </div>

          <div className="projects-section">

            <h2>My Projects</h2>

            {loading ? (
              <Loader />
            ) : projects.length === 0 ? (
              <div className="empty">
                No Projects Found
              </div>
            ) : (
              <div className="project-grid">

                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    onDelete={deleteProject}
                    onEdit={editProject}
                  />
                ))}

              </div>
            )}

          </div>

        </div>

      </div>

      <ProjectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={loadProjects}
        editProject={selectedProject}
      />

      <DeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );

}
export default Dashboard;