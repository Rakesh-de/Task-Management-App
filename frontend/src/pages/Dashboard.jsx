import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import API from "../services/api";

import "../styles/auth.css";
import "../styles/common.css";
import "../styles/dashboard.css";
import "../styles/forms.css";
import "../styles/modal.css";
import "../styles/navbar.css";
import "../styles/project.css";
import "../styles/responsive.css";
import "../styles/sidebar.css";
import "../styles/task.css";

const Dashboard = () => {

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
  });

  const fetchProjects = async () => {

    try {

      const { data } = await API.get("/projects");

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

  const filteredProjects = projects.filter((project) =>
    project.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {

    return <Loader />;

  }

  return (
    <>

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



      <div className="dashboard-search">

        <input
          type="text"
          placeholder="Search Project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {

        filteredProjects.length === 0 ? (

          <EmptyState
            title="No Projects Found"
            message="Create your first project."
          />

        ) : (

          <div className="projects-grid">

            {

              filteredProjects.map((project) => (

                <ProjectCard
                  key={project._id}
                  project={project}
                />

              ))

            }

          </div>

        )

      }     

      <Modal
        isOpen={openModal}
        title="Create New Project"
        onClose={() => setOpenModal(false)}
      >

        <ProjectForm
          onSubmit={createProject}
        />

      </Modal>

    </>

  );

};

export default Dashboard;