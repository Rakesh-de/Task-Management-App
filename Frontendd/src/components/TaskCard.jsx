import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaFlag,
} from "react-icons/fa";

import "./TaskCard.css";

const TaskCard=({
    task,
    onEdit,
    onDelete
})=>{

    const formatDate = (date) => {
        if(!date) return "No Due Date"
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="task-card">
            <div className="task-header">

                <h3>{task.title}</h3>

                <span className={`status-badge ${task.status.replace(/\s/g, "")}`}>
                   {task.status}
                </span>

            </div>

            <p className="task-description">
                {task.description}

            </p>

            <div className="task-info">
                <div className="priority">

                 <FaFlag />
                 <span>{task.priority}</span>
                </div>

                <div className="date">
                    <FaCalendarAlt />
                   <span>{formatDate(task.dueDate)}</span>

                </div>

            </div>
            <div className="task-footer">
                <button className="edit-btn" 
                 onChange={()=>onEdit(task)}
                >
                <FaEdit />
                Edit
                </button>
               
               <button
               className="delete-btn"
               onChange={()=> onDelete(task)}
               
               >
                <FaTrash />
                Delete

               </button>



            </div>
        </div>

    )
}

export default TaskCard;