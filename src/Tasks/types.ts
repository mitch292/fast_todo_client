export enum CATEGORY {
  TESTING_TASK = "testing_task",
  PRODUCT_REQUEST = "product_request",
  REFACTOR = "refactor",
  DEV_TASK = "development_task",
  DESIGN_REQUEST = "design_request",
  MISC = "miscellaneous",
}

export type Task = {
  id: string;
  isComplete: boolean;
  description: string;
  category: CATEGORY;
};

export type TaskInCreate = {
  description: string;
  category: string;
  isComplete: boolean;
};
