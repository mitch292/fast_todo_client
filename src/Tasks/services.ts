import axios from "axios";

import { TaskType, TaskInCreate } from "./types";

export const getTasks = async (): Promise<TaskType[]> => {
  try {
    const { data } = await axios.get(
      "http://localhost:8000/tasks/",
      getAxiosConfig()
    );
    return data.map((t: any) => convertToTask(t));
  } catch (error) {
    throw Error("Not able to fetch all tasks.");
  }
};
export const createTask = async (t: TaskInCreate): Promise<TaskType> => {
  try {
    const { data } = await axios.post(
      `http://localhost:8000/tasks/`,
      {
        ...convertTaskInCreateToJson(t),
      },
      getAxiosConfig()
    );
    return convertToTask(data);
  } catch (error) {
    throw Error("Not able to create the task.");
  }
};

export const updateTask = async (t: TaskType): Promise<TaskType> => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/tasks/${t.id}/`,
      {
        ...convertTaskToJson(t),
      },
      getAxiosConfig()
    );
    return convertToTask(data);
  } catch (error) {
    throw Error("Not able to update the task.");
  }
};

export const deleteTask = async (t: TaskType): Promise<string> => {
  try {
    await axios.delete(
      `http://localhost:8000/tasks/${t.id}/`,
      getAxiosConfig()
    );
    return t.id;
  } catch (error) {
    throw Error("Not able to delete the task.");
  }
};

const convertToTask = (rawTask: any): TaskType => {
  return {
    description: rawTask.description,
    category: rawTask.category,
    id: rawTask.id,
    isComplete: rawTask.is_complete,
  };
};

const convertTaskToJson = (t: TaskType): any => {
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

export const getAxiosConfig = (): any => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
