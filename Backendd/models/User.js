import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,       
    },
    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email"],        
    },

    password:{
      type: String,
      required: true,
      minlength: 6,
      select: false,    // jb user ko call karu to password nhi aayega   
    },


},{
    timestamps:true,
});

//hash password
// Kisi kaam ke hone se pehle ye function chalao.
// schema.pre("event", function () {

// });

/* ===========================
   Hash Password Before Save
=========================== */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

/* ===========================
   Compare Password
=========================== */

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/* ===========================
   Generate JWT Token
=========================== */

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;