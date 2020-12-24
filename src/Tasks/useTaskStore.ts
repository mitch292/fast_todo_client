import create, { State, StateCreator } from "zustand";
import produce, { Draft } from "immer";

import { Task } from "./types";

const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

type TaskState = {
  tasks: Task[];
  update: (t: Task) => void;
  remove: (t: Task) => void;
  create: (t: Task) => void;
  setTasks: (t: Task[]) => void;
};

export const useTaskStore = create(
  immer<TaskState>((set) => ({
    tasks: [],
    update: (t: Task) =>
      set((state) => {
        const index = state.tasks.findIndex((task) => task.id === t.id);
        state.tasks[index] = t;
      }),
    remove: (t: Task) =>
      set((state) => {
        const index = state.tasks.findIndex((task) => task.id === t.id);
        state.tasks.splice(index, 1);
      }),
    create: (t: Task) =>
      set((state) => {
        state.tasks.unshift(t);
      }),
    setTasks: (t: Task[]) =>
      set((state) => {
        state.tasks = t;
      }),
  }))
);
