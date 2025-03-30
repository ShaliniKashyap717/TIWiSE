const bcrypt =require('bcrypt');
const UserModel=require("../models/User");
const jwt=require('jsonwebtoken');



const signup=async(req,res)=>{
    try{
        const {name,email,password,phone_no}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({message:'User is already exist, you can login',success:false});
        }
        const userModel=new UserModel({name,email,password,phone_no});
        userModel.password=await bcrypt.hash(password,10);
        await userModel.save();
       return res.status(201).json({message:"Signup successfully",
            success:true
        })
    }catch(err){
        res.status(500).json({
            message:"Internal server  error",
            success:false
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

        console.log("logging user",user)
        res.status(201).json({
            message: "Login successfully",
            success: true,
            jwtToken,
            email,
            name: user.name,
            avatar: user.avatar || "https://i.pravatar.cc/150", // ✅ Default avatar if not provided
            user: {  
                id: user._id,
                name: user.name,
                email: user.email,
                phone_no: user.phone_no,
                avatar: user.avatar || "https://i.pravatar.cc/150", // ✅ Ensure avatar is included
                role: user.role || "user", // ✅ If role exists
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { name, email, password,phone_no } = req.body;
        console.log("Incoming Profile Update Request:", req.body);

        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Check if email is being updated and already exists in DB
        if (email && email !== user.email) {
            const emailExists = await UserModel.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email is already in use", success: false });
            }
        }

        // If password is provided, validate and hash it
        let hashedPassword = user.password;
        if (password) {
            if (password.length < 3) {
                return res.status(400).json({ message: 'Password must be at least 3 characters long', success: false });
            }
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update user data
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                email: email || user.email,
                password: hashedPassword,
                phone_no: phone_no||user.phone_no,
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUser,
        });

    } catch (err) {
        console.error("Update Profile Error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message,
        });
    }
};


module.exports={
    signup,login,updateUserProfile
}