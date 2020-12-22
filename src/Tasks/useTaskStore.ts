import create from "zustand";

import { Task } from "./types";

type State = {
  tasks: Task[] | [];
  update: (t: Task) => void;
  remove: (t: Task) => void;
  create: (t: Task) => void;
  setTasks: (t: Task[]) => void;
};

export const useTaskStore = create<State>((set) => ({
  tasks: [],
  update: (t: Task) =>
    set((state) => {
      const newTasks = state.tasks.slice();
      const index = newTasks.findIndex((task) => task.id === t.id);
      newTasks[index] = t;
      return { tasks: newTasks };
    }),
  remove: (t: Task) =>
    set((state) => {
      const newTasks = state.tasks.slice();
      const index = newTasks.findIndex((task) => task.id === t.id);
      newTasks.splice(index, 1);
      return { tasks: newTasks };
    }),
  create: (t: Task) =>
    set((state) => {
      const newTasks = state.tasks.slice();
      newTasks.unshift(t);
      return { tasks: newTasks };
    }),
  setTasks: (t: Task[]) => set((state) => ({ tasks: t })),
}));
