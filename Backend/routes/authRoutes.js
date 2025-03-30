const { signupValidation,loginValidation } = require('../middlewares/AuthValidation');
const {signup,login,updateUserProfile}=require('../controllers/authcontroller');
const ensureAuthenticated =require("../middlewares/Auth")

const router = require('express').Router();


router.post('/login',loginValidation,login);
router.post('/signup',signupValidation,signup);
// router.route('/users/profile').post(ensureAuthenticated,updateUserProfile);
router.put('/profile', ensureAuthenticated,updateUserProfile);


module.exports=router;