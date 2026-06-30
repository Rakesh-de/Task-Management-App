import { Link } from "react-router-dom";
import { FolderKanban, CalendarDays } from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">

      <div className="project-card-header">
        <FolderKanban size={28} color="#2563eb" />

        <span
          className={`status ${project.status.toLowerCase()}`}
        >
          {project.status}
        </span>
      </div>

      <h2>{project.title}</h2>

      <p>{project.description}</p>

      <div className="project-info">

        <span>
          Tasks : {project.tasks}
        </span>

        <span>
          <CalendarDays size={16}/>
          {project.deadline}
        </span>

      </div>

      <Link
        to={`/project/${project._id}`}
        className="project-btn"
      >
        Open Project
      </Link>

    </div>
  );
};

export default ProjectCard;