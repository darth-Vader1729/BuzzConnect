// to be able to use the import keyword, in package.json include "types" : "modules"

import express from "express";  // used to create server
import cookieParser from "cookie-parser";
import dotenv from "dotenv";    // access configuration values securely
// dotenv: hides sensitive data that you don't want to expose in your code and also are not checked into version control.


import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();  // load the environment variables from a .env file

// const app = express(); // instance of an express application
const PORT = process.env.PORT || 5000;    // sets the port number for the server to listen on

// test route
// app.get("/", (req, res)=> {
//     // root route : http://localhost:5000/
//     res.send("Hello world!!");
// });

app.use(express.json());   // Middleware to parse JSON bodies -> to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());   // Middleware to parse cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes)


// starting the SERVER
server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
    
    