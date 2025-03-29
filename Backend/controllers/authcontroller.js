const bcrypt =require('bcrypt');
const UserModel=require("../models/user");
const jwt=require('jsonwebtoken');

const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({message:'User is already exist, you can login',success:false});
        }
        const userModel=new UserModel({name,email,password});
        userModel.password=await bcrypt.hash(password,10);
        await userModel.save();
       return res.status(201).json({message:"Signup successfully",
            success:true
        })
    }catch(err){
        res.status(500).json({
            message:"Internal server successfully",
            success:true
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Incoming Login Request:", req.body); // Debugging

        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';

        if (!user) {
            console.log("User not found in DB");
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Debugging bcrypt.compare
        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", user.password);

        const isPassEqual = await bcrypt.compare(password, user.password);
        console.log("Password Match Status:", isPassEqual);

        if (!isPassEqual) {
            console.log("Password mismatch");
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "Login successfully",
            success: true,
            jwtToken,
            email,
            name: user.name
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports={
    signup,login
}