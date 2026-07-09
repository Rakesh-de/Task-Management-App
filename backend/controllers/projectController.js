import mongoose from "mongoose";
import Project from "../models/Project.js";

import Task from "../models/Task.js";

export const createProject = async (req, res) => {

    try {

        const { title, description, deadline, status } = req.body;

        const project = await Project.create({

            title,

            description,

            deadline,
            status,

            owner: req.user._id,

            members: [req.user._id]

        });

        res.status(201).json({

            success: true,

            message: "Project Created Successfully",

            project

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



export const getProjects = async (req, res) => {

    try {

        let projects = await Project.find({

            members: req.user._id

        })
            .populate("owner", "name email")
            .populate("members", "name email");

        // Add tasks 
        projects = await Promise.all(

            projects.map(async (project) => {

                const tasks = await Task.find({

                    project: project._id

                });

                return {

                    ...project.toObject(),

                    tasks

                };

            })

        );

        res.json({

            success: true,

            count: projects.length,

            projects

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



export const getProjectById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Project ID"
            });
        }

        const project = await Project.findById(id)

            .populate("owner", "name email")

            .populate("members", "name email");

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project Not Found"

            });

        }

        res.json({

            success: true,

            project

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



export const updateProject = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Project ID"
            });
        }

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project Not Found"

            });

        }

        project.title = req.body.title || project.title;

        project.description = req.body.description || project.description;

        project.status = req.body.status || project.status;

        project.deadline = req.body.deadline || project.deadline;

        await project.save();

        res.json({

            success: true,

            message: "Project Updated",

            project

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



export const deleteProject = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Project ID"
            });
        }

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project Not Found"

            });

        }

        await project.deleteOne();

        res.json({

            success: true,

            message: "Project Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

}