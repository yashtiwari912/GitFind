import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./passport/github.auth.js"
import path from "path";

import userRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"
import authRoutes from "./routes/auth.route.js"

import passport from "passport";
import session from "express-session";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

//app.use(cors());//Not Needed in Production because the frontend and backend are on the same domain.
const PORT = process.env.PORT || 5000;
//making server run with frontend
const __dirname = path.resolve();
console.log("dirname: ",__dirname);

// app.get('/', (req, res) => res.send('Hello World!'))

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoutes);

//making server run with frontend
app.use(express.static(path.join(__dirname,"/Frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});


app.listen(PORT, () =>{
     console.log(`Server Started on  http://localhost:${PORT}`);
     connectMongoDB();
})