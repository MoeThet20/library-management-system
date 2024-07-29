import dayjs from "dayjs";

export const AUTHENTICATED = "authenticated";

export const DAY_MONTH_YEAR = "DD/MM/YY";

export const DAY_MONTH_YEAR_HOUR_MINUTE = "DD/MM/YY h:mm A";

export const convertDateString = (
  date: string,
  format: string = DAY_MONTH_YEAR
) => dayjs(date).format(format).toString();
