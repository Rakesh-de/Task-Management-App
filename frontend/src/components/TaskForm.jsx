import { useState } from "react";

const TaskForm = ({ onSubmit }) => {

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
  });

  const handleChange = (e) => {

    setTask({

      ...task,

      [e.target.name]: e.target.value,

    });

  };

  const submitHandler = (e) => {

    e.preventDefault();

    onSubmit(task);

    setTask({

      title: "",

      description: "",

      priority: "Medium",

    });

  };

  return (

    <form
      className="task-form"
      onSubmit={submitHandler}
    >

      <input

        type="text"

        name="title"

        placeholder="Task Title"

        value={task.title}

        onChange={handleChange}

        required

      />

      <textarea

        name="description"

        placeholder="Task Description"

        value={task.description}

        onChange={handleChange}

      />

      <select

        name="priority"

        value={task.priority}

        onChange={handleChange}

      >

        <option>Low</option>

        <option>Medium</option>

        <option>High</option>

      </select>

      <select
        name="status"
        value={task.status}
        onChange={handleChange}
      >

        <option value="Todo">Todo</option>

        <option value="In Progress">
          In Progress
        </option>

        <option value="Done">
          Done
        </option>

      </select>

      <button>

        Add Task

      </button>

    </form>

  );

};

export default TaskForm;