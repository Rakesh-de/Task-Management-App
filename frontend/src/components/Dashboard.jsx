import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

import "../styles/dashboard.css";

function Dashboard() {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editProject, setEditProject] = useState(null);

    useEffect(() => {

        fetchProjects();

    }, []);

    const fetchProjects = async () => {

        try {

            setLoading(true);

            const res = await API.get("/projects");

            setProjects(res.data);

        }

        catch (err) {

            toast.error("Failed to load projects");

        }

        finally {

            setLoading(false);

        }

    };

    const createProject = async (data) => {

        try {

            setSaving(true);

            await API.post("/projects", data);

            toast.success("Project Created");

            setShowModal(false);

            fetchProjects();

        }

        catch (err) {

            toast.error("Unable to create project");

        }

        finally {

            setSaving(false);

        }

    };

    const updateProject = async (data) => {

        try {

            setSaving(true);

            await API.put(

                `/projects/${editProject._id}`,

                data

            );

            toast.success("Project Updated");

            setEditProject(null);

            setShowModal(false);

            fetchProjects();

        }

        catch (err) {

            toast.error("Update Failed");

        }

        finally {

            setSaving(false);

        }

    };

    const deleteProject = async (id) => {

        if (

            !window.confirm(

                "Delete this project?"

            )

        ) return;

        try {

            await API.delete(

                `/projects/${id}`

            );

            toast.success(

                "Project Deleted"

            );

            fetchProjects();

        }

        catch (err) {

            toast.error(

                "Delete Failed"

            );

        }

    };

    const filteredProjects =

        projects.filter(project =>

            project.title

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

        );

    const totalProjects =

        projects.length;

    const completedProjects =

        projects.filter(

            p =>

                p.status ===

                "Completed"

        ).length;

    const pendingProjects =

        projects.filter(

            p =>

                p.status !==

                "Completed"

        ).length;
            if (loading) {

        return <Loader />;

    }

    return (

        <>

            <Navbar />

            <div className="dashboard-container">

                <Sidebar />

                <main className="dashboard-content">

                    <div className="dashboard-header">

                        <div>

                            <h1>

                                Dashboard

                            </h1>

                            <p>

                                Welcome back! Manage your projects here.

                            </p>

                        </div>

                        <button

                            className="create-project-btn"

                            onClick={() => {

                                setEditProject(null);

                                setShowModal(true);

                            }}

                        >

                            + New Project

                        </button>

                    </div>

                    <div className="dashboard-stats">

                        <div className="stat-card">

                            <h2>

                                {totalProjects}

                            </h2>

                            <p>

                                Total Projects

                            </p>

                        </div>

                        <div className="stat-card">

                            <h2>

                                {completedProjects}

                            </h2>

                            <p>

                                Completed

                            </p>

                        </div>

                        <div className="stat-card">

                            <h2>

                                {pendingProjects}

                            </h2>

                            <p>

                                Pending

                            </p>

                        </div>

                    </div>

                    <div className="dashboard-search">

                        <input

                            type="text"

                            placeholder="Search Project..."

                            value={search}

                            onChange={(e) =>

                                setSearch(e.target.value)

                            }

                        />

                    </div>

                    {

                        filteredProjects.length === 0

                        ?

                        <EmptyState

                            message="No Projects Found"

                        />

                        :

                        <div className="projects-grid">

                            {

                                filteredProjects.map(project => (

                                    <ProjectCard

                                        key={project._id}

                                        project={project}

                                        onEdit={(project) => {

                                            setEditProject(project);

                                            setShowModal(true);

                                        }}

                                        onDelete={deleteProject}

                                    />

                                ))

                            }

                        </div>

                    }

                </main>

            </div>

            {

                showModal &&

                <Modal

                    title={

                        editProject

                            ? "Edit Project"

                            : "Create Project"

                    }

                    onClose={() => {

                        setShowModal(false);

                        setEditProject(null);

                    }}

                >

                    <ProjectForm

                        editProject={editProject}

                        loading={saving}

                        onSubmit={

                            editProject

                                ? updateProject

                                : createProject

                        }

                        onCancel={() => {

                            setShowModal(false);

                            setEditProject(null);

                        }}

                    />

                </Modal>

            }

        </>

    );

}

export default Dashboard;