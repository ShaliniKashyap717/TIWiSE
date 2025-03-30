
const jwt=require('jsonwebtoken');
const ensureAuthenticated =(req,res,next)=>{
    console.log("🔵 Middleware called!");

    const auth=req.headers['authorization'];
    console.log("🔵 Middleware called!");

    if(!auth || !auth.startsWith('Bearer ')){
        console.log("🔵 Middleware called!");
        return res.status(403)
            .json({message:'Unauthorized, JWT token is require'});
    }
    try{
        const token=auth.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log("🟢 Decoded Token:", decoded);

        req.user=decoded;
        next();
    }catch(err){
        console.log("🔴 JWT Verification Failed:", err.message);
        return res.status(403)
            .json({message:'Unauthorized, JWT token wrong or expired'});

    }
}

module.exports =ensureAuthenticated;