import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CONFLICT, SUCCESS } from "@/const/status";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { books, borrowedIds, studentId, teacherId } = data;

  const returnData = books.map((bookId: string) => ({
    booksId: bookId,
    studentId: studentId,
    teacherId: teacherId,
  }));

  const returnBookTransaction = await prisma.$transaction(async (prisma) => {
    const returnBook = await prisma.returnBook.createMany({
      data: returnData,
    });

    for (const bookId of books) {
      await prisma.books.update({
        where: { id: bookId },
        data: {
          is_borrow_able: true,
        },
      });
    }

    for (const borrowedId of borrowedIds) {
      await prisma.borrowBook.update({
        where: { id: borrowedId },
        data: {
          is_returned: true,
        },
      });
    }

    return returnBook;
  });

  return NextResponse.json(returnBookTransaction, SUCCESS);
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const page: number = Number(searchParams.get("page")) || 1;
  const pageSize: number = Number(searchParams.get("pageSize")) || 10;
  const search: string = searchParams.get("search") || "";

  const pageNumber = page;
  const size = pageSize;
  const searchTerm = search;
  //TODO need to apply by date range and need to populate the data
  const totalReturnBook = await prisma.returnBook.count();

  const returnBook = await prisma.returnBook.findMany({
    skip: (pageNumber - 1) * size,
    take: size,
  });

  const borrowBookRes = {
    total: totalReturnBook,
    page: pageNumber,
    pageSize: size,
    list: returnBook,
  };

  return NextResponse.json(borrowBookRes, SUCCESS);
}
