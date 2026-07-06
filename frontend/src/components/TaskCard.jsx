import { CheckCircle2, Trash2 } from "lucide-react";

const TaskCard = ({ task, onDelete, onComplete }) => {

  return (

    <div className="task-card">

      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <div className="task-footer">

        <div>

          <span
            className={`status ${task.status.toLowerCase().replace(" ", "-")}`}
          >
            {task.status}
          </span>

        </div>

        <span
          className={`priority ${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>

        <div className="task-actions">

          <button
            className="complete-btn"
            onClick={() => onComplete(task._id)}
          >
            <CheckCircle2 size={18} />
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(task._id)}
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>

  );

};

export default TaskCard;