import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SUCCESS } from "@/const/status";
import dayjs from "dayjs";
import { YEAR_MONTH_DAY } from "@/const";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const totalTeacher = await prisma.teacher.count({
    where: {
      NOT: {
        email: {
          endsWith: "admin@gmail.com",
        },
      },
    },
  });
  const totalStudent = await prisma.student.count();
  const totalBook = await prisma.books.count();
  const totalCategory = await prisma.category.count();
  const totalBorrow = await prisma.borrowBook.count({
    where: {
      is_returned: false,
    },
  });

  const warningList = await prisma.borrowBook.findMany({
    where: {
      is_returned: false,
      created_date: {
        lte: new Date(dayjs().subtract(3, "day").format(YEAR_MONTH_DAY)),
      },
    },
  });

  const response = {
    totalTeacher,
    totalStudent,
    totalBook,
    totalBorrow,
    totalCategory,
  };

  return NextResponse.json(response, SUCCESS);
}
