import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CONFLICT, SUCCESS } from "@/const/status";

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

  const response = {
    totalTeacher,
    totalStudent,
    totalBook,
    totalBorrow,
    totalCategory,
  };

  return NextResponse.json(response, SUCCESS);
}
