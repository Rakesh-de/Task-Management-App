import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

import projectFetch from "../utils/projectFetch";
import projectCreate from "../utils/projectCreate";
import projectDelete from "../utils/projectDelete";
import projectComplete from "../utils/projectComplete";

import "../styles/project.css";

const Project = () => {

  
  // =============================
  // Params
  // =============================

  const { id } = useParams();

  console.log("Project ID from URL:", id);

  // =============================
  // States
  // =============================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [project, setProject] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  // =============================
  // Load Project
  // =============================

  const fetchProject = () =>

    projectFetch(

      id,

      setProject,

      setTasks,

      setLoading

    );

  useEffect(() => {

    fetchProject();

  }, []);

  // =============================
  // Create Task
  // =============================

  const createTask = (task) =>

    projectCreate(

      id,

      task,

      fetchProject,

      setOpenModal

    );

 
  // Delete Task
  

  const deleteTask = (taskId) =>

    projectDelete(

      taskId,

      fetchProject

    );

  
  // Complete Task
  

  const completeTask = (taskId) =>

    projectComplete(

      taskId,

      fetchProject

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

        <div className="project-page">

          <div className="project-header">

            <div>

              <h1>{project?.title}</h1>

              <p>{project?.description}</p>

            </div>

            <button
              className="btn"
              onClick={() => setOpenModal(true)}
            >
              + Add Task
            </button>

          </div>

          {/* Task List */}

          {

            tasks.length === 0 ? (

              <EmptyState

                title="No Tasks Found"

                message="Create your first task."

              />

            ) : (

              <div className="task-grid">

                {

                  tasks.map((task) => (

                    <TaskCard

                      key={task._id}

                      task={task}

                      onDelete={deleteTask}

                      onComplete={completeTask}

                    />

                  ))

                }

              </div>

            )

          }

          {/* Add Task Modal */}

          <Modal

            isOpen={openModal}

            title="Add New Task"

            onClose={() => setOpenModal(false)}

          >

            <TaskForm

              onSubmit={createTask}

            />

          </Modal>

        </div>

      </div>

    </div>

  );

};

export default Project;