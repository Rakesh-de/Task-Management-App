// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { toast } from "react-toastify";

// import API from "../services/api";

// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import Loader from "../components/Loader";
// import EmptyState from "../components/EmptyState";
// import Modal from "../components/Modal";
// import TaskCard from "../components/TaskCard";
// import TaskForm from "../components/TaskForm";

// import "../styles/project.css";

// function Project() {

//     const { id } = useParams();

//     const navigate = useNavigate();

//     const [project, setProject] = useState(null);

//     const [tasks, setTasks] = useState([]);

//     const [loading, setLoading] = useState(true);

//     const [saving, setSaving] = useState(false);

//     const [showModal, setShowModal] = useState(false);

//     const [editTask, setEditTask] = useState(null);

//     const [search, setSearch] = useState("");

//     const [priorityFilter, setPriorityFilter] = useState("All");

//     useEffect(() => {

//         loadProject();

//         loadTasks();

//     }, []);

//     const loadProject = async () => {

//         try {

//             const res = await API.get(`/projects/${id}`);

//             setProject(res.data);

//         }

//         catch {

//             toast.error("Unable to load project");

//         }

//     };

//     const loadTasks = async () => {

//         try {

//             setLoading(true);

//             const res = await API.get(`/tasks/project/${id}`);

//             setTasks(res.data);

//         }

//         catch {

//             toast.error("Unable to load tasks");

//         }

//         finally {

//             setLoading(false);

//         }

//     };

//     const createTask = async (data) => {

//         try {

//             setSaving(true);

//             await API.post("/tasks", {

//                 ...data,

//                 projectId: id,

//             });

//             toast.success("Task Created");

//             setShowModal(false);

//             loadTasks();

//         }

//         catch {

//             toast.error("Unable to create task");

//         }

//         finally {

//             setSaving(false);

//         }

//     };

//     const updateTask = async (data) => {

//         try {

//             setSaving(true);

//             await API.put(

//                 `/tasks/${editTask._id}`,

//                 data

//             );

//             toast.success("Task Updated");

//             setEditTask(null);

//             setShowModal(false);

//             loadTasks();

//         }

//         catch {

//             toast.error("Unable to update task");

//         }

//         finally {

//             setSaving(false);

//         }

//     };

//     const deleteTask = async (taskId) => {

//         if (

//             !window.confirm(

//                 "Delete this task?"

//             )

//         ) return;

//         try {

//             await API.delete(`/tasks/${taskId}`);

//             toast.success("Task Deleted");

//             loadTasks();

//         }

//         catch {

//             toast.error("Delete failed");

//         }

//     };

//     const toggleTaskStatus = async (task) => {

//         try {

//             await API.put(

//                 `/tasks/${task._id}`,

//                 {

//                     completed: !task.completed,

//                 }

//             );

//             loadTasks();

//         }

//         catch {

//             toast.error("Unable to update");

//         }

//     };

//     const filteredTasks = tasks.filter(task => {

//         const matchesSearch =

//             task.title

//                 .toLowerCase()

//                 .includes(

//                     search.toLowerCase()

//                 );

//         const matchesPriority =

//             priorityFilter === "All"

//                 ? true

//                 : task.priority === priorityFilter;

//         return matchesSearch && matchesPriority;

//     });

//     const completedTasks =

//         tasks.filter(t => t.completed).length;

//     const pendingTasks =

//         tasks.filter(t => !t.completed).length;
//             if (loading) {
//         return <Loader />;
//     }

//     return (
//         <>
//             <Navbar />

//             <div className="project-layout">

//                 <Sidebar />

//                 <main className="project-content">

//                     <button
//                         className="back-btn"
//                         onClick={() => navigate("/dashboard")}
//                     >
//                         <ArrowLeft size={18} />
//                         Back
//                     </button>

//                     <div className="project-header">

//                         <div>

//                             <h1>{project?.title}</h1>

//                             <p>{project?.description}</p>

//                         </div>

//                         <button
//                             className="create-task-btn"
//                             onClick={() => {
//                                 setEditTask(null);
//                                 setShowModal(true);
//                             }}
//                         >
//                             + Add Task
//                         </button>

//                     </div>

//                     <div className="task-stats">

//                         <div className="task-stat-card">

//                             <h2>{tasks.length}</h2>

//                             <p>Total Tasks</p>

//                         </div>

//                         <div className="task-stat-card">

//                             <h2>{completedTasks}</h2>

//                             <p>Completed</p>

//                         </div>

//                         <div className="task-stat-card">

//                             <h2>{pendingTasks}</h2>

//                             <p>Pending</p>

//                         </div>

//                     </div>

//                     <div className="task-toolbar">

//                         <input
//                             type="text"
//                             placeholder="Search task..."
//                             value={search}
//                             onChange={(e) =>
//                                 setSearch(e.target.value)
//                             }
//                         />

//                         <select
//                             value={priorityFilter}
//                             onChange={(e) =>
//                                 setPriorityFilter(e.target.value)
//                             }
//                         >

//                             <option value="All">

//                                 All Priorities

//                             </option>

//                             <option value="High">

//                                 High

//                             </option>

//                             <option value="Medium">

//                                 Medium

//                             </option>

//                             <option value="Low">

//                                 Low

//                             </option>

//                         </select>

//                     </div>

//                     {

//                         filteredTasks.length === 0

//                         ?

//                         <EmptyState

//                             message="No Tasks Found"

//                         />

//                         :

//                         <div className="task-grid">

//                             {

//                                 filteredTasks.map(task => (

//                                     <TaskCard

//                                         key={task._id}

//                                         task={task}

//                                         onEdit={(task) => {

//                                             setEditTask(task);

//                                             setShowModal(true);

//                                         }}

//                                         onDelete={deleteTask}

//                                         onToggleStatus={toggleTaskStatus}

//                                     />

//                                 ))

//                             }

//                         </div>

//                     }

//                 </main>

//             </div>

//             {

//                 showModal && (

//                     <Modal

//                         title={

//                             editTask

//                                 ? "Edit Task"

//                                 : "Create Task"

//                         }

//                         onClose={() => {

//                             setShowModal(false);

//                             setEditTask(null);

//                         }}

//                     >

//                         <TaskForm

//                             editTask={editTask}

//                             loading={saving}

//                             onSubmit={

//                                 editTask

//                                     ? updateTask

//                                     : createTask

//                             }

//                             onCancel={() => {

//                                 setShowModal(false);

//                                 setEditTask(null);

//                             }}

//                         />

//                     </Modal>

//                 )

//             }

//         </>
//     );

// }

// export default Project;