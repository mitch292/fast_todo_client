import axios from "axios";

import { Task } from "./types";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const { data } = await axios.get("http://localhost:8000/tasks");
    return data.map((t: any) => convertToTask(t));
  } catch (error) {
    throw Error("Not able to fetch all tasks.");
  }
};

export const updateTask = async (t: Task): Promise<Task> => {
  try {
    const { data } = await axios.put(`http://localhost:8000/tasks/${t.id}`, {
      ...convertToJson(t),
    });
    return convertToTask(data);
  } catch (error) {
    throw Error("Not able to update the task.");
  }
};

export const deleteTask = async (t: Task): Promise<string> => {
  try {
    await axios.delete(`http://localhost:8000/tasks/${t.id}`);
    return t.id;
  } catch (error) {
    throw Error("Not able to delete the task.");
  }
};

const convertToTask = (rawTask: any): Task => {
  return {
    createdAt: new Date(rawTask.created_at),
    updatedAt: new Date(rawTask.updated_at),
    description: rawTask.description,
    category: rawTask.category,
    id: rawTask.id,
    isComplete: rawTask.is_complete,
  };
};

const convertToJson = (t: Task): any => {
  return {
    created_at: t.createdAt,
    updated_at: t.updatedAt,
    description: t.description,
    category: t.category,
    id: t.id,
    is_complete: t.isComplete,
  };
};
