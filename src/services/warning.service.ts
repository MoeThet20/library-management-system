import { lmsClient } from "./api";

const WARNING = "warning";

export const getWarningWithQuery = async (
  page: number | null = 1,
  pageSize: number | null = 10
) => {
  const res = await lmsClient.get(
    `${WARNING}?page=${page}&pageSize=${pageSize}`
  );
  return res?.data;
};
