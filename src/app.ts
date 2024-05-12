import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import taskRoutes from "../src/routes/taskRoutes";

const app: Application = express();

app.use(morgan("dev"));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api", taskRoutes);

export default app;
