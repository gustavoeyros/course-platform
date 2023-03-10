import express from "express";
import routes from "./routes/routes";
import { run } from "./db/conn";

const app = express();

app.use(express.json());

app.use(routes);
run();
app.listen(3000, () => console.log("Running in 3000"));
