import { ImmerStateCreator } from "../createStore";
import { TaskType, TaskInCreate } from "./types";
import { updateTask, createTask, deleteTask, getTasks } from "./services";

export enum AUTH_STATUS {
  EMPTY = "EMPTY",
  BUSY = "BUSY",
  AUTHENTICATED = "AUTHENTICATED",
  ERROR = "ERROR",
}

export type State = {
  tasks: {
    tasks: TaskType[];
    update: (t: TaskType) => void;
    remove: (t: TaskType) => void;
    create: (t: TaskInCreate) => void;
    getAll: () => void;
    setTasks: (t: TaskType[]) => void;
    setTask: (t: TaskType) => void;
  };
};

export const creator: ImmerStateCreator<State> = (set) => ({
  tasks: {
    tasks: [],
    update: async (t: TaskType) => {
      set(async (state) => {
        try {
          await updateTask(t);
          // const index = state.tasks.tasks.findIndex(
          //   (task) => task.id === newTask.id
          // );
          // state.tasks.tasks[index] = newTask;
          state.tasks.getAll();
        } catch (error) {
          throw Error("Update task failed");
        }
      });
    },
    create: async (t: TaskInCreate) => {
      set(async (state) => {
        try {
          const newTask = await createTask(t);
          state.tasks.setTask(newTask);
        } catch (error) {
          throw Error("Create task failed");
        }
      });
    },
    remove: async (t: TaskType) => {
      set(async (state) => {
        try {
          await deleteTask(t);
          state.tasks.getAll();
        } catch (error) {
          throw Error("Delete task failed");
        }
      });
    },
    setTask: (t: TaskType) => {
      set((state) => {
        state.tasks.tasks.unshift(t);
      });
    },
    setTasks: (t: TaskType[]) => {
      set((state) => {
        state.tasks.tasks = t;
      });
    },
    getAll: async () => {
      set(async (state) => {
        try {
          const tasks = await getTasks();
          state.tasks.setTasks(tasks);
        } catch (error) {
          throw Error("Fetch tasks failed.");
        }
      });
    },
  },
});
