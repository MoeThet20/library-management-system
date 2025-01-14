import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const ONE_SECOND = 1000;

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

export const setYearOnly = (originalDate: Date) =>
  dayjs(originalDate).format("YYYY");

export const debounce = (target: Function, ms: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return new Proxy(target, {
    apply(target, thisArg, args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        Reflect.apply(target, thisArg, args);
      }, ms);
    },
  });
};

export const yearRoleNumberConverter = (
  year: string,
  roleNumber: number
): string => {
  switch (year) {
    case "First":
      return `I-EC-${roleNumber}`;
    case "Second":
      return `II-EC-${roleNumber}`;
    case "Third":
      return `III-EC-${roleNumber}`;
    case "Fourth":
      return `IV-EC-${roleNumber}`;
    case "Fifth":
      return `V-EC-${roleNumber}`;
    default:
      return `VI-EC-${roleNumber}`;
  }
};
