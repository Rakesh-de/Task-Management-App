import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async(req,res,next)=>{
    try{
        let token;

        // Authorization
        if(req.headers.authorization && req.headers.authorization.startWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({
                success : false,
                message: "No token provided"
            });
        }

        //verify jwt
        const decoded = jwt.verify(token ,process.env.JWT_SECRET);

        const user = await user.findById(decoded.id).select("-password");

        if(!user){
            return res.status(401).json({
                success : false,
                message:"User Not Found",
            });
        }

        req.user = user;

        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired token"
        })
    }
};

export default protect;