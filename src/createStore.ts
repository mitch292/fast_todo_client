import create, {
  State,
  StateCreator,
  GetState,
  PartialState,
  StoreApi,
  UseStore,
} from "zustand";
import produce from "immer";
import shallow from "zustand/shallow";
import { devtools } from "zustand/middleware";

const USE_DEVTOOLS = process.env.NODE_ENV === "development";

type ImmerProduceFunc<T> = (draft: T) => void;
type NamedSet<T extends State> = (
  partial: PartialState<T>,
  replace?: boolean,
  name?: string
) => void;

export type ImmerSetState<T> = (
  fn: ImmerProduceFunc<T>,
  replace?: boolean,
  actionName?: string
) => void;

export type ImmerStateCreator<T extends State> = (
  set: ImmerSetState<T>,
  get: GetState<T>,
  api: StoreApi<T>
) => T;

export type Slice<T extends State, K extends keyof T> = Partial<T> & Pick<T, K>;

const immer = <T extends State>(
  creator: StateCreator<T, ImmerSetState<T>>
): StateCreator<T> => (set: NamedSet<T>, get: GetState<T>, api: StoreApi<T>) =>
  creator(
    (immerProduceFunc, replace, name) =>
      set(produce(immerProduceFunc) as (state: T) => T, replace, name),
    get,
    api
  );

export const createWithImmer = <T extends State>(
  creator: ImmerStateCreator<T>,
  storeName?: string
): UseStore<T> => {
  return USE_DEVTOOLS
    ? create(devtools(immer(creator), storeName))
    : create(immer(creator));
};

export { shallow };
export type { GetState };
