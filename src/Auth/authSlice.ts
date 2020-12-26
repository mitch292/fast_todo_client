import { ImmerStateCreator } from "../createStore";
import { Token, UserInCreate, UserInLogin } from "./types";
import { registerUser, loginUser } from "./services";
import { AUTH_STATUS } from "./types";

export type State = {
  auth: {
    status: AUTH_STATUS;
    setStatus: (status: AUTH_STATUS) => void;
    setInitialStatus: () => void;
    login: (u: UserInLogin) => void;
    token: Token;
    setToken: (t: Token) => void;
    register: (u: UserInCreate) => void;
  };
};

export const creator: ImmerStateCreator<State> = (set) => ({
  auth: {
    status: AUTH_STATUS.EMPTY,
    setStatus: (status: AUTH_STATUS) => {
      set((state) => {
        state.auth.status = status;
      });
    },
    setInitialStatus: () => {
      set((state) => {
        if (localStorage.getItem("token")) {
          state.auth.setStatus(AUTH_STATUS.AUTHENTICATED);
        } else {
          state.auth.setStatus(AUTH_STATUS.EMPTY);
        }
      });
    },
    login: async (u: UserInLogin) => {
      set(async (state) => {
        state.auth.setStatus(AUTH_STATUS.BUSY);
        try {
          const result = await loginUser(u);
          state.auth.setToken(result);
          state.auth.setStatus(AUTH_STATUS.AUTHENTICATED);
        } catch (error) {
          state.auth.setStatus(AUTH_STATUS.ERROR);
        }
      });
    },
    register: async (u: UserInCreate) => {
      set(async (state) => {
        state.auth.setStatus(AUTH_STATUS.BUSY);
        try {
          const result = await registerUser(u);
          state.auth.setToken(result);
          state.auth.setStatus(AUTH_STATUS.AUTHENTICATED);
        } catch (error) {
          state.auth.setStatus(AUTH_STATUS.ERROR);
        }
      });
    },
    token: {
      accessToken: "",
      tokenType: "",
    },
    setToken: (t: Token) => {
      set((state) => {
        // also set in local storage
        localStorage.setItem("token", t.accessToken);
        state.auth.token = t;
      });
    },
  },
});
