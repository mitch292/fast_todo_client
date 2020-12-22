import axios from "axios";

import { Task, TaskInCreate } from "./types";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const { data } = await axios.get("http://localhost:8000/tasks/");
    return data.map((t: any) => convertToTask(t));
  } catch (error) {
    throw Error("Not able to fetch all tasks.");
  }
};
export const createTask = async (t: TaskInCreate): Promise<Task> => {
  try {
    const { data } = await axios.post(`http://localhost:8000/tasks/`, {
      ...convertTaskInCreateToJson(t),
    });
    return convertToTask(data);
  } catch (error) {
    throw Error("Not able to create the task.");
  }
};

export const updateTask = async (t: Task): Promise<Task> => {
  try {
    const { data } = await axios.put(`http://localhost:8000/tasks/${t.id}/`, {
      ...convertTaskToJson(t),
    });
    return convertToTask(data);
  } catch (error) {
    throw Error("Not able to update the task.");
  }
};

export const deleteTask = async (t: Task): Promise<string> => {
  try {
    await axios.delete(`http://localhost:8000/tasks/${t.id}/`);
    return t.id;
  } catch (error) {
    throw Error("Not able to delete the task.");
  }
};

const convertToTask = (rawTask: any): Task => {
  return {
    description: rawTask.description,
    category: rawTask.category,
    id: rawTask.id,
    isComplete: rawTask.is_complete,
  };
};

const convertTaskToJson = (t: Task): any => {
  return {
    description: t.description,
    category: t.category,
    id: t.id,
    is_complete: t.isComplete,
  };
};

const convertTaskInCreateToJson = (t: TaskInCreate): any => {
  return {
    description: t.description,
    category: t.category,
    is_complete: t.isComplete,
  };
};
