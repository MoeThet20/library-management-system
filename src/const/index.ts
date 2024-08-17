import dayjs from "dayjs";

export const AUTHENTICATED = "authenticated";

export const DAY_MONTH_YEAR = "DD/MM/YY";

export const DAY_MONTH_YEAR_HOUR_MINUTE = "DD/MM/YY h:mm A";

export const convertDateString = (
  date: string,
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
  { value: "first", label: "First Year" },
  { value: "second", label: "Second Year" },
  { value: "third", label: "Third Year" },
  { value: "fourth", label: "Fourth Year" },
  { value: "fifth", label: "Fifth Year" },
  { value: "final", label: "Final Year" },
];

export const CONFIRM_MESSAGE = {
  DELETE: "Do you want to delete?",
};
