import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const port = 5000;

app.get('/', (req, res) => res.send('Hello World!'))

app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoutes);



app.listen(port, () => console.log(`Example app listening on port ${port}!`))