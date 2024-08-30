import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SUCCESS } from "@/const/status";
import dayjs from "dayjs";
import { WARNING_TIME, YEAR_MONTH_DAY } from "@/const";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const page: number = Number(searchParams.get("page")) || 1;
  const pageSize: number = Number(searchParams.get("pageSize")) || 10;

  const pageNumber = page;
  const size = pageSize;

  const totalWarning = await prisma.borrowBook.count({
    where: {
      is_returned: false,
      created_date: {
        lte: new Date(
          dayjs().subtract(WARNING_TIME, "day").format(YEAR_MONTH_DAY)
        ),
      },
    },
    skip: (pageNumber - 1) * size,
    take: size,
  });

  const warningList = await prisma.borrowBook.findMany({
    where: {
      is_returned: false,
      created_date: {
        lte: new Date(
          dayjs().subtract(WARNING_TIME, "day").format(YEAR_MONTH_DAY)
        ),
      },
    },
    skip: (pageNumber - 1) * size,
    take: size,
    include: {
      book_id: true,
      borrowed_by: true,
      created_by: true,
    },
    orderBy: {
      created_date: "desc",
    },
  });

  const changedNameWarning =
    warningList.length > 0
      ? warningList.map((borrow) => ({
          id: borrow.id,
          title: borrow.book_id.title,
          studentName: borrow.borrowed_by.name,
          teacherName: borrow.created_by.name,
          studentId: borrow.borrowed_by.id,
          bookId: borrow.book_id.id,
          createdDate: borrow.created_date,
        }))
      : [];

  const borrowBookRes = {
    total: totalWarning,
    page: pageNumber,
    pageSize: size,
    list: changedNameWarning,
  };

  return NextResponse.json(borrowBookRes, SUCCESS);
}
