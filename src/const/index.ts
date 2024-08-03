import dayjs from "dayjs";

export const AUTHENTICATED = "authenticated";

export const DAY_MONTH_YEAR = "DD/MM/YY";

export const DAY_MONTH_YEAR_HOUR_MINUTE = "DD/MM/YY h:mm A";

export const convertDateString = (
  date: string,
  format: string = DAY_MONTH_YEAR
) => dayjs(date).format(format).toString();

export const OCCUPATION = [
  { value: "professor", label: "Professor" },
  { value: "associate_professor", label: "Associate Professor" },
  { value: "lecturer", label: "Lecturer" },
  { value: "tutor", label: "Tutor" },
  { value: "demonstrator", label: "Demonstrator" },
  { value: "officer", label: "Officer" },
  { value: "others", label: "Others" },
];
export const YEARS = [
  { value: "first", label: "First Year" },
  { value: "second", label: "Second Year" },
  { value: "third", label: "Third Year" },
  { value: "fourth", label: "Fourth Year" },
  { value: "fifth", label: "Fifth Year" },
  { value: "final", label: "Final Year" },
];