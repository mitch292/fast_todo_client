import create, { State, StateCreator } from "zustand";
import produce, { Draft } from "immer";

import { Token } from "./types";

const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

type AuthState = {
  token: {
    token: Token;
    setToken: (t: Token) => void;
  };
};

export const useAuthStore = create(
  immer<AuthState>((set) => ({
    token: {
      token: {
        accessToken: "",
        tokenType: "",
      },
      setToken: (t: Token) =>
        set((state) => {
          state.token.token = t;
        }),
    },
  }))
);
