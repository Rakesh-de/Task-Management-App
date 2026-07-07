import Project from "../models/Project.js"
import Task from "../models/Task.js";

export const createProject = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            res.status(400);

            throw new Error("Title And Description are Required");
        }

        const project = await Project.create({
            title,
            description,
            owner: req.user._id,
        })

        res.status(201).json({
            success: true,
            message: "Project created Successfully",
            project,
        })
    } catch (error) {
        next(error);
    }


}

export const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({
            owner: req.user._id,
        }).sort({ createdAt: -1 });
        res.status(201).json({
            success: true,
            message: "Project created Successfully",
            project,
        })
    } catch (error) {
        next(error);
    }
}

export const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user._id,
        });

        if (!project) {
            res.status(404);
            throw new Error("Project not Found");
        }

        res.status(200).json({
            success: true,
            project,
        })
    } catch (error) {

        next(error);
    };
}

export const updateProject = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user._id,
        })

        if (!project) {
            res.status(404);
            throw new Error("Project not Found");
        }

        project.title = title || project.title;
        project.description = description || project.description;

        const updatedProject = await project.save();

        res.status(200).json({
            success: true,
            project,
        })
    } catch (error) {

        next(error);
    };
}
// export const deleteProject = async (req, res, next) => {
//         try {


//             const project = await Project.findOne({
//                 _id: req.params.id,
//                 owner: req.user._id,
//             })

//             if (!project) {
//                 res.status(404);
//                 throw new Error("Project not Found");
//             }

//             await project.deleteOne();
//             res.status(200).json({
//                 success: true,
//                 message: "Project deleted sucessfully"
//             })
//         } catch (error) {

//             next(error);
//         };
//     }



export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    // Delete all tasks of this project
    await Task.deleteMany({
      project: project._id,
    });

    // Delete project
    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project and related tasks deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};