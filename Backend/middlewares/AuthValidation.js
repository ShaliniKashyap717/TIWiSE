const Joi =require('joi');

const signupValidation = (req, res, next) => {
    console.log("Request Body:", req.body); // Debugging ke liye

    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(100).required(),
        email: Joi.string().trim().min(3).required(),
        password: Joi.string().trim().min(3).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        console.log("Validation Error:", error.details);
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

const loginValidation = (req, res, next) => {
    console.log("Login Validation Middleware Hit");
    console.log("Request Body:", req.body);

    const schema = Joi.object({
        email: Joi.string().trim().min(3).required(),
        password: Joi.string().trim().min(3).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        console.log("Validation Error:", error.details);
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};


module.exports={signupValidation,loginValidation}