import Task from "../models/Task.js"
import Project from "../models/Project.js"


export const createTask = async (req, res, next) => {
    try {
        const { title, description, status, priority, dueDate, assignedTo } = req.body;

        const project = await Project.findOne({
            _id: req.params.projectId,
            owner: req.user._id,
        });

        if (!project) {
            res.status(404);
            throw new Error("Project not found");
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            assignedTo,
            project: project._id,
            createdBy: req.user._id,
        })
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        next(error);
    }


}


export const getTasks = async (req, res, next) => {
    try {
        const project = await Project.findOne({

            _id: req.params.projectId,
            owner: req.user._id,
        });

        if (!project) {
            res.status(404);
            throw new Error("Project not Found");
        }

        const filter = {
            project: project._id,
        }

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.priority) {
            filter.priority = req.query.priority;
        }

        if (req.query.search) {
            filter.title = {
                $regex: req.query.search,
                $options: "i",
            };
        }

        const tasks = await Task.find(filter)
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });



        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        })


    } catch (error) {
        next(error);
    }
}

export const getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email")
            .populate("project");

        if (!task) {
            res.status(404);
            throw new Error("Task not Found");
        }

        if (task.project.owner.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error("Unauthorized");
        }

        res.status(200).json({
            success: true,
            task,
        })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id).populate("project");

        if (!task) {
            res.status(404);
            throw new Error("Task not Found");
        }

        if (task.project.owner.toString() !== req.user._id.toString) {
            res.status(403);
            throw new Error("Unauthorized");
        }

        const {
            title,
            description,
            status,
            priority,
            dueDate,
            assignedTo,
        } = req.body;


        if (title !== undefined && title !== null) {
            task.title = title;
        } 

        if (description !== undefined && description !== null) {
            task.description = description;
        } 

        if (status !== undefined && status !== null) {
            task.status = status;
        } 

        if (priority !== undefined && priority !== null) {
            task.priority = priority;
        } 

        if (dueDate !== undefined && dueDate !== null) {
            task.dueDate = dueDate;
        } 
        if (assignedTo !== undefined && assignedTo !== null) {
            task.assignedTo = assignedTo;
        } 

        await task.save();
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async(req,res,next)=>{
    try{
        const task = await Task.findById(req.params.id).populate("project");

        if (!task) {
            res.status(404);
            throw new Error("Task not Found");
        }

        if (task.project.owner.toString() !== req.user._id.toString) {
            res.status(403);
            throw new Error("Unauthorized");
        }        

        await task.deleteOne();

        res.status(200).json({
            success : true,
            message : "Task deleted Successfully",

        })

    }catch(error){
        next(error);
    }
}