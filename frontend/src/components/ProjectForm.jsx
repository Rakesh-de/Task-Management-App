import { useState } from "react";

const ProjectForm = ({ onSubmit }) => {

  const [project, setProject] = useState({
    title: "",
    description: "",
    deadline: "",
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

      <button>

        Create Project

      </button>

    </form>

  );

};

export default ProjectForm;