import express from "express";
import UserRoutes from "./routes/UserRoutes";
import CourseRoutes from "./routes/CourseRoutes";
import { run } from "./db/conn";

const app = express();

app.use(express.json());

app.use("/users", UserRoutes);
app.use("/course", CourseRoutes);
run();
app.listen(3000, () => console.log("Running in 3000"));
