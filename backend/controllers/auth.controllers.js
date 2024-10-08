import User from "../models/user.models.js";
import bycrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if(password!==confirmPassword)
            return res.status(400).json({error : "Passwords do not match"});
        
        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({error : "Username already exists"});
        }
    
        // HASHING PASSWORDS HERE
        const salt = await bycrypt.genSalt(10); // higher value more securtiy and longer to create salt
        
        const hashedPassword = await bycrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/
        const boyProfilePic  = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePic : gender==="male" ? boyProfilePic : girlProfilePic,
        });

        if(newUser) {
            // Generate JWT token 
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save(); // save to DB

            res.status(201).json({ 
                _id : newUser._id,
                fullName : newUser.fullName,
                username : newUser.username,
                password : newUser.password,
                profilePic : newUser.profilePic
            });
        }
        else {
            res.status(400).json({error: "Invalid User Details"})
        }
        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        
        res.status(500).json({error: "Internal server error"})
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bycrypt.compare(password, user?.password || " ")
        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error : "Invalid User Details"});
        }
        
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id : user._id,
            fullName : user.fullName ,
            username : user.username ,
            profilePic : user.profilePic ,
        })
        
    } catch (error) {
        console.log("Error in login controller", error.message);
        
        res.status(500).json({error: "Internal server error"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}