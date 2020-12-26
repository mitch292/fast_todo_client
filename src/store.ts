import { createWithImmer, ImmerStateCreator } from "./createStore";
// import { authSlice } from "./Auth";
// import { taskSlice } from "./Tasks";
import * as authSlice from "./Auth/authSlice"; // TODO: why isnt line 2 working?
import * as taskSlice from "./Tasks/taskSlice";

type FullState = authSlice.State & taskSlice.State;

const creator: ImmerStateCreator<FullState> = (set, get, api) => ({
  ...authSlice.creator(set, get, api),
  ...taskSlice.creator(set, get, api),
});
export const useStore = createWithImmer<FullState>(creator, "Fast Todo");
