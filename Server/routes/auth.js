import express from "express"; 
import { body, validationResult } from 'express-validator';
import { forgotPasswordController, getUserController, googleLoginController, loginController, registerController } from "../controller/authController.js";
import {fetchUser, isAdmin} from "../middleware/fetchUser.js"


const router = express.Router();

// creating a user
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email ").isEmail(),
    body("password", "minimum password length 5 ").isLength({ min: 5 })
], registerController)


// Authenticate a user at the time of login
router.post('/login', [
    body('email', "Enter a valid email ").isEmail(),
    body('password', "Password cannot be blank").exists()
], loginController)
// login using google auth
router.post('/google-login', googleLoginController)
// forgot password endpoint
router.post('/forgotpassword',forgotPasswordController)


//Get logdin details using post: "api/auth/getuser"
router.get('/getuser', fetchUser,getUserController);

//Get logdin details of Admin
router.get('/admin-auth', fetchUser,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});

export default router;