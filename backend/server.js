// to be able to use the import keyword, in package.json include "types" : "modules"

import express from "express";  // used to create server
import cookieParser from "cookie-parser";
// dotenv: hides sensitive data that you don't want to expose in your code and also are not checked into version control.
import dotenv from "dotenv";    // access configuration values securely


import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
dotenv.config(); // load the environment variables from a .env file

const app = express(); // instance of an express application
const PORT = process.env.PORT || 5000; // sets the port number for the server to listen on

// test route
// app.get("/", (req, res)=> {
//     // root route : http://localhost:5000/
//     res.send("Hello world!!");
// });

// to parse the incoming requests with JSON payloads from req.body
app.use(express.json());    // help us to extract all the user's fields
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes)

// app.get("/api/auth/signup", (req, res) => {console.log("Signup Route")});
// instead use middleware thanks to express

// starting the SERVER
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
    
});
    
    