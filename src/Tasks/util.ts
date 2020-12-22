import { CATEGORY } from "./types";

export const categoryLookup: Record<CATEGORY, string> = {
  [CATEGORY.TESTING_TASK]: "Testing Task",
  [CATEGORY.PRODUCT_REQUEST]: "Product Request",
  [CATEGORY.REFACTOR]: "Existing Code Refactor",
  [CATEGORY.DEV_TASK]: "Development Task",
  [CATEGORY.DESIGN_REQUEST]: "Design Request",
  [CATEGORY.MISC]: "Miscellaneous",
};

export const CATEGORY_OPTIONS = [
  { label: categoryLookup[CATEGORY.MISC], value: CATEGORY.MISC },
  {
    label: categoryLookup[CATEGORY.TESTING_TASK],
    value: CATEGORY.TESTING_TASK,
  },
  {
    label: categoryLookup[CATEGORY.PRODUCT_REQUEST],
    value: CATEGORY.PRODUCT_REQUEST,
  },
  { label: categoryLookup[CATEGORY.REFACTOR], value: CATEGORY.REFACTOR },
  { label: categoryLookup[CATEGORY.DEV_TASK], value: CATEGORY.DEV_TASK },
  {
    label: categoryLookup[CATEGORY.DESIGN_REQUEST],
    value: CATEGORY.DESIGN_REQUEST,
  },
];
