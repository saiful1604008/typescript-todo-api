import { Request, Response } from "express";
import { postTask } from "../models/task";
import {
  addTask,
  getAllTasks,
  getSummaryReport,
  getTaskByStatus,
  updateTodoService,
} from "../services/taskService";

export const getAllTasksController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = await getAllTasks();
    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const VALID_STATUSES = ["pending", "in progress", "completed"];

    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }
    if (!VALID_STATUSES.includes(status)) {
      res.status(400).json({
        message: `Invalid status. Allowed statuses: ${VALID_STATUSES.join(
          ", "
        )}`,
      });
      return;
    }

    const newTask: postTask = {
      title,
      description,
      status,
    };

    const createdTask = addTask(newTask);

    res.status(200).json({
      message: "successfully added task in the list",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getTaskbyStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.params;
    const VALID_STATUSES = ["pending", "in progress", "completed"];

    if (!VALID_STATUSES.includes(status)) {
      res.status(400).json({
        error: `Invalid status. Allowed statuses: ${VALID_STATUSES.join(", ")}`,
      });
      return;
    }

    const getSpecificTask = await getTaskByStatus(status);

    if (getSpecificTask.length === 0) {
      res.status(200).json({
        message: "no data found",
      });
    } else {
      res.status(200).json(getSpecificTask);
    }
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateTodoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todoId = parseInt(req.params.id, 10);
    const { status, description } = req.body;

    if (!status && !description) {
      res.status(400).json({
        message: "Provide at least one field to update: status or description.",
      });
      return;
    }

    const updatedTodo = await updateTodoService(todoId, {
      status,
      description,
    });

    if (!updatedTodo) {
      res.status(404).json({ message: "TODO item not found." });
      return;
    }

    res.status(200).json({
      message: "Item updated successfully",
    });
  } catch (e) {
    console.error("Error updating TODO:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSummaryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reportData = await getSummaryReport();
    res.status(200).json({
      status: "success",
      statusCode: 200,
      data: reportData,
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
