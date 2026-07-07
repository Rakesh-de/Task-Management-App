import {
    FaTrash,
    FaEdit,
    FaArrowRight
} from "react-icons/fa";

import { Link } from "react-router-dom";
import './ProjectCard.css';

const ProjectCard = ({ project, onDelete ,onEdit}) => {
    return (
        <div className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>

            <div className="card-footer">
              <Link to={`/projects/${project._id}`}>
                <button className="view-btn">
                    <FaArrowRight/>
                    Open
                </button>

                </Link>

                <div>
                    <button onClick={() => onEdit(project)}  className="edit-btn" >
                        <FaEdit />
                      
                    </button>

                    <button onClick={() => onDelete(project)} className="delete-btn">
                        <FaTrash />
                    </button>
                </div>
            </div>
               

        </div>
    )
};

export default ProjectCard;