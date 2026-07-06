import { useState } from "react";

const ProjectForm = ({ onSubmit }) => {

  const [project, setProject] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "Pending",
  });

  const handleChange = (e) => {

    setProject({

      ...project,

      [e.target.name]: e.target.value,

    });

  };

  const submitHandler = (e) => {

    e.preventDefault();

    onSubmit(project);

    setProject({

      title: "",

      description: "",

      deadline: "",

    });

  };

  return (

    <form
      className="project-form"
      onSubmit={submitHandler}
    >

      <input

        type="text"

        name="title"

        placeholder="Project Title"

        value={project.title}

        onChange={handleChange}

        required

      />

      <textarea

        name="description"

        placeholder="Description"

        value={project.description}

        onChange={handleChange}

      />

      <input

        type="date"

        name="deadline"

        value={project.deadline}

        onChange={handleChange}

      />

      <select
        name="status"
        value={project.status}
        onChange={handleChange}
      >
        <option value="Pending">Pending</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>

      <button>

        Create Project

      </button>

    </form>

  );

};

export default ProjectForm;