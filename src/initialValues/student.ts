import dayjs from "dayjs";

export type STUDENT_REGISTER_TYPE = {
  name: string;
  roleNumber: number;
  initialYearFromDate: Date;
  initialYearToDate: Date;
  currentYear: string;
  phoneNumber: string;
};

export type STUDENT_REGISTER_SERVICE_TYPE = {
  name: string;
  roleNumber: number;
  initialYearFromDate: Date;
  initialYearToDate: Date;
  currentYear: string;
  phoneNumber: string;
  teacherId: string;
};

export const STUDENT_REGISTER_INITIAL_VALUES = {
  name: "",
  roleNumber: 0,
  initialYearFromDate: new Date(dayjs().subtract(1, "year").toString()),
  initialYearToDate: new Date(),
  currentYear: "",
  phoneNumber: "",
};

export type STUDENT_UPDATE_TYPE = {
  id: string;
  name: string;
  roleNumber: number;
  initialYearFromDate: Date;
  initialYearToDate: Date;
  currentYear: string;
  phoneNumber: string;
};

export const STUDENT_UPDATE_INITIAL_VALUES = {
  id: "",
  name: "",
  roleNumber: 0,
  initialYearFromDate: new Date(dayjs().subtract(1, "year").toString()),
  initialYearToDate: new Date(),
  currentYear: "",
  phoneNumber: "",
};
