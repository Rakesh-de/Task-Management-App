import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

import API from "../services/api";

import "../styles/project.css";

const Project = () => {

  const { id } = useParams();

  const [project, setProject] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  // =============================
  // Load Project
  // =============================

  const fetchProject = async () => {

    try {

      const { data } = await API.get(`/projects/${id}`);

      setProject(data.project);

      setTasks(data.tasks);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchProject();

  }, []);

  // =============================
  // Create Task
  // =============================

  const createTask = async (task) => {

    try {

      await API.post(`/tasks/${id}`, task);

      fetchProject();

      setOpenModal(false);

    }

    catch (err) {

      console.log(err);

    }

  };

  // =============================
  // Delete Task
  // =============================

  const deleteTask = async (taskId) => {

    try {

      await API.delete(`/tasks/${taskId}`);

      fetchProject();

    }

    catch (err) {

      console.log(err);

    }

  };

  // =============================
  // Complete Task
  // =============================

  const completeTask = async (taskId) => {

    try {

      await API.put(`/tasks/${taskId}`);

      fetchProject();

    }

    catch (err) {

      console.log(err);

    }

  };

  if (loading) {

    return <Loader />;

  }  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

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

            tasks.length === 0 ?

            (

              <EmptyState

                title="No Tasks Found"

                message="Create your first task."

              />

            )

            :

            (

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