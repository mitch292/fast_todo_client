import create, { State, StateCreator } from "zustand";
import produce, { Draft } from "immer";

import { TaskType } from "./types";

const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

type TaskState = {
  tasks: TaskType[];
  update: (t: TaskType) => void;
  remove: (t: TaskType) => void;
  create: (t: TaskType) => void;
  setTasks: (t: TaskType[]) => void;
};

export const useTaskStore = create(
  immer<TaskState>((set) => ({
    tasks: [],
    update: (t: TaskType) =>
      set((state) => {
        const index = state.tasks.findIndex((task) => task.id === t.id);
        state.tasks[index] = t;
      }),
    remove: (t: TaskType) =>
      set((state) => {
        const index = state.tasks.findIndex((task) => task.id === t.id);
        state.tasks.splice(index, 1);
      }),
    create: (t: TaskType) =>
      set((state) => {
        state.tasks.unshift(t);
      }),
    setTasks: (t: TaskType[]) =>
      set((state) => {
        state.tasks = t;
      }),
  }))
);
