import Task from "../models/Task.js";
import Project from "../models/Project.js";

/* ==============================
   Create Task
============================== */

export const createTask = async (req, res) => {

    try {

        const { title, description, priority, dueDate, assignedTo } = req.body;

        const project = await Project.findById(req.params.projectId);

        if (!project) {

            return res.status(404).json({
                success: false,
                message: "Project Not Found"
            });

        }

        const task = await Task.create({

            title,

            description,

            priority,

            dueDate,

            assignedTo,

            project: req.params.projectId

        });

        res.status(201).json({

            success: true,

            message: "Task Created Successfully",

            task

        });

    }

    catch (error) {
            console.error("CREATE TASK ERROR:");
            console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==============================
   Get Tasks By Project
============================== */

export const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({

            project: req.params.projectId

        })

        .populate("assignedTo", "name email");

        res.json({

            success: true,

            count: tasks.length,

            tasks

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==============================
   Get Single Task
============================== */

export const getTaskById = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id)

        .populate("assignedTo", "name email");

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task Not Found"

            });

        }

        res.json({

            success: true,

            task

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==============================
   Update Task
============================== */

export const updateTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task Not Found"

            });

        }

        task.title = req.body.title || task.title;

        task.description = req.body.description || task.description;

        task.priority = req.body.priority || task.priority;

        task.status = req.body.status || task.status;

        task.dueDate = req.body.dueDate || task.dueDate;

        task.assignedTo = req.body.assignedTo || task.assignedTo;

        await task.save();

        res.json({

            success: true,

            message: "Task Updated",

            task

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==============================
   Delete Task
============================== */

export const deleteTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task Not Found"

            });

        }

        await task.deleteOne();

        res.json({

            success: true,

            message: "Task Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==============================
   Update Task Status
============================== */

export const updateTaskStatus = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task Not Found"

            });

        }

        task.status = req.body.status;

        await task.save();

        res.json({

            success: true,

            message: "Status Updated",

            task

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};