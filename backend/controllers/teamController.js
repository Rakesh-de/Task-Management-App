import Project from "../models/Project.js";
import User from "../models/User.js";

/* ===========================
   Add Member
=========================== */

export const addMember=async(req,res)=>{

try{

const {email}=req.body;

const user=await User.findOne({email});

if(!user){

return res.status(404).json({

success:false,

message:"User Not Found"

});

}

const project=await Project.findById(

req.params.projectId

);

if(!project){

return res.status(404).json({

success:false,

message:"Project Not Found"

});

}

if(

project.members.includes(user._id)

){

return res.status(400).json({

success:false,

message:"Already Member"

});

}

project.members.push(user._id);

await project.save();

res.json({

success:true,

message:"Member Added",

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

/* ===========================
   Remove Member
=========================== */

export const removeMember=async(req,res)=>{

try{

const project=await Project.findById(

req.params.projectId

);

project.members=project.members.filter(

(id)=>id.toString()!==req.params.userId

);

await project.save();

res.json({

success:true,

message:"Member Removed"

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};