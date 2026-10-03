import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body || {};

        // Basic validation
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All Fields are important" });
        }

        const normalizedEmail = email.toLowerCase();

        // Check if user already exists
        const existing = await User.findOne({ email: normalizedEmail });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create user
        const user = await User.create({
            username,
            email: normalizedEmail,
            password
        });

        return res.status(201).json({
            message: "Registered successfully",
            user: { id: user._id, email: user.email, username: user.username }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
const loginUser = async (req, res) => {
    try {
        //checking user existance
        const { email, password } = req.body || {};
        const user = await User.findOne({
            email: email?.trim().toLowerCase()
        });

        if (!user) {
            return res.status(400).json({
                message: "User Not Found"
            });
        }

        //compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        res.status(200).json({
            message: "user loggedd in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
const logoutUser = async (req,res) =>{
    try {
        const { email } = req.body || {};
        if (!email) return res.status(400).json({
            message: "email is required"
        });

        const user= await User.findOne({
            email: email?.trim().toLowerCase()
        });
        if(!user)return res.status(404).json({
            message: "user not found"
        });

        res.status(200).json({
            message:"Log out successful"
        });
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error: error.message
        });
    }
}
export { registerUser,
         loginUser,
         logoutUser
 };