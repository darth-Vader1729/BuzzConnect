import User from "../models/user.models.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // all users from the DB except the one with the id not-equal(ne) to loggedInUserId
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password"); // all fields of the user but the password
        
        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in user controller : ", error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
}
