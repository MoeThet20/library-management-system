import dayjs from "dayjs";

export const AUTHENTICATED = "authenticated";

export const DAY_MONTH_YEAR = "DD/MM/YY";

export const DAY_MONTH_YEAR_HOUR_MINUTE = "DD/MM/YY h:mm A";

export const YEAR_MONTH_DAY = "YYYY-MM-DD";

export const convertDateString = (
  date: string | Date,
  format: string = DAY_MONTH_YEAR
) => dayjs(date).format(format).toString();

export const OCCUPATION = [
  { value: "Professor", label: "Professor" },
  { value: "AssociateProfessor", label: "Associate Professor" },
  { value: "Lecturer", label: "Lecturer" },
  { value: "Tutor", label: "Tutor" },
  { value: "Demonstrator", label: "Demonstrator" },
  { value: "Officer", label: "Officer" },
  { value: "Others", label: "Others" },
];
export const YEARS = [
  { value: "First", label: "First Year" },
  { value: "Second", label: "Second Year" },
  { value: "Third", label: "Third Year" },
  { value: "Fourth", label: "Fourth Year" },
  { value: "Fifth", label: "Fifth Year" },
  { value: "Final", label: "Final Year" },
];

export const CONFIRM_MESSAGE = {
  DELETE: "Do you want to delete?",
};

export const WARNING_TIME = 3;
