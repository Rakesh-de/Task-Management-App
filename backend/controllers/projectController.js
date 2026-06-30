import Project from "../models/Project.js";

/* =====================================
   Create Project
===================================== */

export const createProject = async (req, res) => {

    try {

        const { title, description, deadline } = req.body;

        const project = await Project.create({

            title,

            description,

            deadline,

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

/* =====================================
   Get All Projects
===================================== */

export const getProjects = async (req, res) => {

    try {

        const projects = await Project.find({

            members: req.user._id

        })

        .populate("owner","name email")

        .populate("members","name email");

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

/* =====================================
   Get Single Project
===================================== */

export const getProjectById = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id)

        .populate("owner","name email")

        .populate("members","name email");

        if (!project) {

            return res.status(404).json({

                success:false,

                message:"Project Not Found"

            });

        }

        res.json({

            success:true,

            project

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

/* =====================================
   Update Project
===================================== */

export const updateProject = async (req,res)=>{

    try{

        const project=await Project.findById(req.params.id);

        if(!project){

            return res.status(404).json({

                success:false,

                message:"Project Not Found"

            });

        }

        project.title=req.body.title || project.title;

        project.description=req.body.description || project.description;

        project.status=req.body.status || project.status;

        project.deadline=req.body.deadline || project.deadline;

        await project.save();

        res.json({

            success:true,

            message:"Project Updated",

            project

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

/* =====================================
   Delete Project
===================================== */

export const deleteProject=async(req,res)=>{

    try{

        const project=await Project.findById(req.params.id);

        if(!project){

            return res.status(404).json({

                success:false,

                message:"Project Not Found"

            });

        }

        await project.deleteOne();

        res.json({

            success:true,

            message:"Project Deleted Successfully"

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};