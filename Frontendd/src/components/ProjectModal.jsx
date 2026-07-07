import { useEffect,useState } from "react";
import api from "../services/api";
import "./ProjectModal.css";

const ProjectModel = ({open , onClose ,onSuccess ,editProject}) => {
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");

    useEffect(()=>{
        if(editProject){
            setTitle(editProject.title);
            setDescription(editProject.description);
        }else{
            setTitle("");
            setDescription(""); 


        }

    }, [editProject]);

    if(!open) return null;

    const submitHandler = async (e)=>{
        e.preventDefault();
        try{
            if(editProject){
                await api.put(`/projects/${editProject._id}`, {title, description});
            }else{
                await api.post("/projects", {title, description});
            }

            onSuccess();
            onClose();
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }

};
return (
    <div className="modal-overlay">
        <div className="modal">
            <h2>{editProject ? "Edit Project" : "Add Project"}</h2>
              <form onsubmit={submitHandler}>
                <input
                type = 'text'
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />

                <textarea
                  placeholder="Project Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                 
                />  

                <div className="modal-buttons">
                    <button type = "button" onClick={onClose} className="cancel-btn">
                        Cancel
                    </button>
                    <button type = "submit" className="save-btn">
                        {editProject ? "Update" : "Save"}

                    </button>

                </div>

              </form>

    </div>

    </div>
);
}   

export default ProjectModel;
