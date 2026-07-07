import User from "../models/User.js"

export const registerUser = async(req,res,next)=>{
    try{
        const {name ,email ,password} = req.body;

        // validation
        if(!name || !email || !password){
            res.status(400);
            throw new Error("Please provide all required fields");
        }

        const existingUser = await User.findOne({email})
       
        if(existingUser){
            res.status(400);
            throw new Error("User already exists");
        }

        const user = await User.create({
            name,
            email,
            password
        });

        //generate token
        const token = user.generateToken();

        res.status(201).json({
            success : true,
            message:"User register Successfully",
            token,
            user :{
                id :
                user._id,
                name : user.name,
                email: user.email,
            },
        })
    }catch(error){
        next(error);
    }
};

export const loginUser = async(req,res,next)=>{
    try{
        const {email,password} = req.body;

        // validation
        if(!email || !password){
            res.status(400);
            throw new Error ("Please provide email and password")
        }

        const user = await User.findOne({email}).select("+password");

        if(!user){
            res.status(401);
            throw new Error("Invalid email or Password")
        }

        // compair password 
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            res.status(401);
            throw new Error("Invalid email or Password")
        }


        const token = user.generateToken();

                res.status(201).json({
            success : true,
            message:"User register Successfully",
            token,
            user :{
                id :
                user._id,
                name : user.name,
                email: user.email,
            },
        })
    }catch(error){
        next(error);
    }

    }


export const getProfile = async(req,res,next)=>{
    try{
        res.status(200).json({
            success:true,
            user : req.user,
        })
    
    }catch(error){
        next(error);
    }
}