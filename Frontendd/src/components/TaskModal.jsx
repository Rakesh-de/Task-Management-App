import { useState,useEffect } from "react";
import api from "../services/api"

import "./TaskModal.css"

const TaskModal=({open,onClose,projectId,task,onSuccess})=>{
    const [form,setForm] = useState({
        title:"",
        description:"",
        status:"To Do",
        priority:"Medium",
        dueDate:"",
    })
      useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate
          ? task.dueDate.substring(0, 10)
          : "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        status: "To Do",
        priority: "Medium",
        dueDate: "",
      });
    }
  }, [task]);

  if(!open) return null;

  const changeHandler=(e)=>{
    setForm({
        ...form,
        [e.target.name]:e.target.value,
    });
  };

  const submitHandler= async(e)=>{
    e.preventDefalut();
   try{
    
    if(task){
        await api.put(`/tasks/${task._id}`,form);
    }else{
        await api.post(`/tasks/${projectId}`,form);
    }

    onSuccess();
    onClose();
 }catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };



return(
    <div className="task-overlay">
        <div className="task-modal">

            <h2>{task ? "Edit Task" :"Create Task"}</h2>
            
            <form onSubmit={submitHandler}>

                <input
                 type = "text"
                 name = "title"
                 placeholder="Task Title"
                 value={form.title}
                 onChange={changeHandler}
                />

                <textarea
                  row = "4"
                  name="description"
                  placeholder="Description"
                  value = {from.description}
                  onChange={changeHandler}
                  required
                />

                <div className="row">
                    <select
                      name = "status"
                      value = {form.status}
                      onChange={changeHandler}
                    >

                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>

                   </select>

                   <select
                   name="priority"
                   value={from.priority}
                   onChange={changeHandler}
                   > 
                   <option>Low</option>
                   <option>Medium</option>
                   <option>High</option>

                   </select>

                </div>

                <input
                type = "date"
                name = "dueDate"
                value={form.dueDate}
                onChange={changeHandler}
                />

                <div className="task-buttons">
                    <button
                    type="button"
                    className="cancel-btn"
                    onClick={onclose}
                    
                    >Cancel</button>

                    <button
                    type="submit"
                    className="save-btn"
                    
                    >
                        {task ? "Update Task" : "Create Task"}

                    </button>

                </div>

            </form>
        </div>

    </div>
);
};

export default TaskModal;