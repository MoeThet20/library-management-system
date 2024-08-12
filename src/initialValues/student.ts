export type STUDENT_REGISTER_TYPE = {
  name: string;
  roleNumber: number;
  initialYear: string;
  currentYear: string;
  phoneNumber: string;
};
export const STUDENT_REGISTER_INITIAL_VALUES = {
  name: "",
  roleNumber: 0,
  initialYear: "",
  currentYear: "",
  phoneNumber: "",
};

export type STUDENT_UPDATE_TYPE = {
  id: string;
  name: string;
  roleNumber: number;
  initialYear: string;
  currentYear: string;
  phoneNumber: string;
};
export const STUDENT_UPDATE_INITIAL_VALUES = {
  name: "",
  roleNumber: 0,
  initialYear: "",
  currentYear: "",
  phoneNumber: "",
};
