export type CATEGORY_CREATE_TYPE = {
  category: string;
  teacherId: string;
};
export const CATEGORY_CREATE_INITIAL_VALUES = {
  category: "",
  teacherId: "",
};

export type CATEGORY_UPDATE_TYPE = {
  id: string;
  category: string;
};
export const CATEGORY_UPDATE_INITIAL_VALUES = {
  id: "",
  category: "",
};
