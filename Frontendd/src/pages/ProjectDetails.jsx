import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import "./ProjectDetails.css";

const ProjectDetails = () => {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);


    const [openTaskModal, setOpenTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const loadProject = async () => {
        try {
            const { data } = await api.get(`/projects/${id}`);

            setProject(data.project)
        } catch (err) {
            console.log(err);
        }
    }

    const loadTasks = async () => {
        try {
            let url = `tasks/${id}`;

            const params = [];
            if (search) {
                params.push('search=${search}')
            }

            if (status) {
                params.push('status=${status}');
            }

            if (params.length) {
                url = url + "?" + params.join("&");
            }

            const { data } = await api.get(url);
            setTasks(data.tasks)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadProject();
    }, []);

    useEffect(() => {
        loadTasks();
    }, [search, status]);



    return (
        <>
            <Sidebar />
            <div className="project-page">
                <Navbar />
                <div className="project-container">
                    <div className="project-header">

                        <h1>{project?.title}</h1>
                        <p>{project?.description}</p>

                    </div>

                    <button
                        className="add-task-btn"
                        onClick={() => {
                            setSelectedTask(null);
                            setOpenTaskModal(true);
                        }}
                    >

                        +Add Task
                    </button>

                </div>

                <div className="filters">
                    <input
                        placeholder="Search Task..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}

                    >
                        <option value="">All Status</option>
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Done</option>



                    </select>

                </div>

                <div className="task-list">

                    {

                        tasks.length === 0 ?

                            (

                                <div className="empty-task">

                                    No Tasks Available

                                </div>

                            )

                            :

                            tasks.map((task) => (

                                <TaskCard

                                    key={task._id}

                                    task={task}

                                    onEdit={(task) => {

                                        setSelectedTask(task);

                                        setOpenTaskModal(true);

                                    }}

                                    onDelete={async (task) => {

                                        if (window.confirm("Delete Task?")) {

                                            await api.delete(`/tasks/${task._id}`);

                                            loadTasks();

                                        }

                                    }}

                                />

                            ))

                    }

                </div>

            </div>


            <TaskModal
                open={openTaskModal}
                onClose={() => setOpenTaskModal(false)}
                projectId={id}
                task={selectedTask}
                onSuccess={loadTasks}
            />



        </>
    )
}
export default ProjectDetails;