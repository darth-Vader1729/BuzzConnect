import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn : '15d' // 15 days to ms
    })

    // also want to set it as a cookie
    res.cookie("jwt", token, {
        maxAge : 15*24*60*60*1000,
        httpOnly : true, // prevent XSS(cross-site scripting) attacks 
        sameSite : "strict", // CSRF attacks cross-site request forgery attacks
        // secure : process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookies;