import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import db from "../../config/database";
import { getSummary, getTask, postTask } from "../models/task";

export const getAllTasks = async (): Promise<getTask[]> => {
  try {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM task");
    return rows as getTask[];
  } catch (e) {
    throw new Error(
      "Could not fetch tasks from the database. Please try again later."
    );
  }
};

export const addTask = async (task: postTask): Promise<postTask> => {
  try {
    const query =
      "INSERT INTO task (title, description, status, created_at) VALUES (? , ? , ?, NOW())";
    const [result] = await db.query<ResultSetHeader>(query, [
      task.title,
      task.description || null,
      task.status,
    ]);

    return {
      id: result.insertId,
      title: task.title,
      description: task.description,
      status: task.status,
      created_at: new Date().toISOString(),
    };
  } catch (e) {
    throw new Error("Could not add tasks. Please try again.");
  }
};

export const getTaskByStatus = async (status: string): Promise<getTask[]> => {
  try {
    const query = "SELECT * from task where status = ?";
    const [rows] = await db.query<RowDataPacket[]>(query, [status]);
    return rows as getTask[];
  } catch (e) {
    throw new Error(
      "Could not fetch tasks based on status from the database. Please try again later."
    );
  }
};

export const updateTodoService = async (
  todoId: number,
  updateFields: { status?: string; description?: string }
): Promise<RowDataPacket | null> => {
  try {
    const { status, description } = updateFields;

    let updateQuery = "UPDATE task SET ";
    const updateValues: any[] = [];

    if (status) {
      updateQuery += "status = ?, ";
      updateValues.push(status);
    }

    if (description) {
      updateQuery += "description = ?, ";
      updateValues.push(description);
    }

    updateQuery = updateQuery.trim().slice(0, -1);
    updateQuery += " WHERE id = ?";

    updateValues.push(todoId);

    const [result] = await db.query<ResultSetHeader>(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return null;
    }

    const [rows]: any = await db.query("SELECT * FROM task WHERE id = ?", [
      todoId,
    ]);
    return rows[0];
  } catch (e) {
    console.log(e);
    throw new Error("Could not update tasks. Please try again later.");
  }
};

export const getSummaryReport = async (): Promise<getSummary[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT STATUS as status, COUNT(STATUS) as count FROM task WHERE STATUS IN  ("pending" , "in progress" , "completed") GROUP BY STATUS`
  );
  return rows as getSummary[];
};
