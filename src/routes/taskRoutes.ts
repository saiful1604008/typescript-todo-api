import express from "express";
import {
  addTaskController,
  getAllTasksController,
  getSummaryController,
  getTaskbyStatusController,
  updateTodoController,
} from "../controllers/taskController";

const router = express.Router();

router.get("/get-all-task", getAllTasksController);
router.post("/add-task", addTaskController);
router.get("/get-task-list/:status", getTaskbyStatusController);
router.put("/todo/:id", updateTodoController);
router.get("/get-task-summary", getSummaryController);

export default router;
