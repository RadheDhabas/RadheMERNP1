import { hashedPassword, passwordCompare } from "../helpers/authHelper.js";
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import axios from 'axios'
import { body, validationResult } from 'express-validator';
// controller for user creation
export const registerController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });  // It checks that a given email exist in user data  
        if (user) {
            // if email already exist in database , then show below message 
            return res.status(400).json({ error: "Sorry, A user with this email already exist" });
        }
        const secPass = await hashedPassword(req.body.password);

        // create a new user using schema and save in mongodb data base
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        // using auth token for authentication
        // const data = {
        //     user: {id: user.id}
        // }
        // const JWT_SECRET = process.env.JWT_SECRET;
        // const authToken = jwt.sign(data, JWT_SECRET);
        // res.json({ authToken });

        // 2nd method to save data in data base 
        // user = await new User({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: secPass,
        // })
        // user.save();  
        // res.status(200).send(req.body)
        res.status(200).json({ message: "account created" })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error at the time of creating account");
    }

}

// controller for login auth
export const loginController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Please try to login using correct credentials' })
        }
        const passwordMatch = await passwordCompare(password, user.password); //return true false

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Please try to login using correct credentials' })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(200).json({ success: true, authToken, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error" + error);
    }
}
// controller for google login
export const googleLoginController = async (req, res) => {
    try {
        const { tokenId } = req.body;
        const user_data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + tokenId);
        const email = user_data.data.email;
        let existinguser = await User.findOne({ email }).select("-googleId");

        if (existinguser) {
            const data = {
                user: {
                    id: existinguser._id
                }
            }
            const JWT_SECRET = process.env.JWT_SECRET;
            const authToken = jwt.sign(data, JWT_SECRET);
            return res.status(200).json({ success: true, authToken, user:existinguser });
        }
        else {
            let user = await User.create({
                name: user_data.data.name,
                email: user_data.data.email,
                googleId: user_data.data.sub,
                googleEmail: user_data.data.email,
            })
            existinguser = await User.findOne({ email }).select("-googleId");
            const data = {
                user: {
                    id: existinguser.id
                }
            }
            const JWT_SECRET = process.env.JWT_SECRET;
            const authToken = jwt.sign(data, JWT_SECRET);
            return res.status(200).json({ success: true, authToken, existinguser });
        }
    } catch (error) {
        console.error("Error while signing with google: " + error);
    }
}
// controller for forgot password
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, question, newPassword } = req.body;
        if (!email && !question && !newPassword) {
            res.status(400).send({ message: "Fill all the required fields" })
        }

        const user = await User.findOne({ email, question });
        if (!user) {
            res.status(404).send({
                success: false,
                message: "Wrong email or question"
            })
        }
        const hashPass = await hashedPassword(newPassword);
        await User.findByIdAndUpdate(user._id, { password: hashPass });
        res.status(200).send({
            success: true,
            message: "Password changed successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}

// get user data using auth tocken
export const getUserController = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        return res.status(200).json({ user: user, success: true });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error" + error);
    }
}