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
  const startDate: string = searchParams.get("startDate") || "";
  const endDate: string = searchParams.get("endDate") || "";

  const pageNumber = page;
  const size = pageSize;

  const totalReturnBook = await prisma.returnBook.count({
    where: {
      created_date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });

  const returnBook = await prisma.returnBook.findMany({
    where: {
      created_date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    skip: (pageNumber - 1) * size,
    take: size,
    include: {
      book_id: true,
      return_by: true,
      created_by: true,
    },
  });

  const changedNameReturnBook =
    returnBook.length > 0
      ? returnBook.map((borrow) => ({
          id: borrow.id,
          title: borrow.book_id.title,
          studentName: borrow.return_by.name,
          teacherName: borrow.created_by.name,
          studentId: borrow.return_by.id,
          bookId: borrow.book_id.id,
          createdDate: borrow.created_date,
        }))
      : [];

  const returnBookRes = {
    total: totalReturnBook,
    page: pageNumber,
    pageSize: size,
    list: changedNameReturnBook,
  };

  return NextResponse.json(returnBookRes, SUCCESS);
}
