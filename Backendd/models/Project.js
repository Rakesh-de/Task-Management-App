import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
      type: String,
      required:true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description:{
      type: String,
      required: true,
      trim: true,
      maxlength: 500,       
    },
    owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,        
    },
},{
     timestamps: true,
});

const Project = mongoose.model("Project",projectSchema);

export default Project;