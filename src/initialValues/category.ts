export type CATEGORY_CREATE_SERVICE_TYPE = {
  category: string;
  teacherId: string;
};

export type CATEGORY_CREATE_TYPE = {
  category: string;
};

export const CATEGORY_CREATE_INITIAL_VALUES = {
  category: "",
};

export type CATEGORY_UPDATE_TYPE = {
  id: string;
  category: string;
};
export const CATEGORY_UPDATE_INITIAL_VALUES = {
  id: "",
  category: "",
};
