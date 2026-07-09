import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";


export const createTask = async (req, res) => {

    try {

        const { title, description, priority, dueDate, status, assignedTo } = req.body;

        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Project ID"
            });
        }

        const project = await Project.findById(projectId);

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

            status,

            dueDate,

            assignedTo,

            project: projectId

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



export const getTasks = async (req, res) => {

    try {

        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Project ID"
            });
        }

        const tasks = await Task.find({

            project: projectId

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



export const getTaskById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID"
            });
        }

        const task = await Task.findById(id)

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


export const updateTask = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID"
            });
        }

        const task = await Task.findById(id);

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



export const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID"
            });
        }

        const task = await Task.findById(id);

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



export const updateTaskStatus = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Task ID"
        });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }

    if (task.status === "Todo") {
      task.status = "In Progress";
    }
    else if (task.status === "In Progress") {
      task.status = "Done";
    }
    else {
      task.status = "Todo";
    }

    await task.save();

    res.json({
      success: true,
      message: "Task Status Updated",
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};