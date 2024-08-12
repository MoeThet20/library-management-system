export type TEACHER_REGISTER_TYPE = {
  name: string;
  email: string;
  rfid: string;
  phoneNumber: string;
  occupation: string;
  password: string;
  confirmPassword: string;
};
export const TEACHER_REGISTER_INITIAL_VALUES = {
  name: "",
  email: "",
  rfid: "",
  phoneNumber: "",
  occupation: "",
  password: "",
  confirmPassword: "",
};

export type TEACHER_UPDATE_TYPE = {
  id: string;
  name: string;
  email: string;
  rfid: string;
  phoneNumber: string;
  occupation: string;
};
export const TEACHER_UPDATE_INITIAL_VALUES = {
  id: "",
  name: "",
  email: "",
  rfid: "",
  phoneNumber: "",
  occupation: "",
};
