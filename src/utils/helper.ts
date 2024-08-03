import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export function asyncErrorWrapper(
  fn: Function,
  errorHandlerFunc: Function = errorHandler
) {
  return async (...args: any) => {
    try {
      return await fn.apply(this, args);
    } catch (err: any) {
      errorHandlerFunc(err);
    }
  };
}

function errorHandler(err: typeof Error) {}

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Text copied to clipboard");
    },
    (err) => {
      console.error("Failed to copy text: ", err);
    }
  );
};

export const setDateOnly = (originalDate: Date) =>
  dayjs(originalDate).startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");