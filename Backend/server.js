import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./passport/github.auth.js"

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

app.use(cors());
const port = 5000;

app.get('/', (req, res) => res.send('Hello World!'))

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoutes);



app.listen(port, () =>{
     console.log(`Example app listening on port ${port}!`);
     connectMongoDB();
})