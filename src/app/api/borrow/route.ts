import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SUCCESS } from "@/const/status";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { books, studentId, teacherId } = data;

  const borrowData = books.map((bookId: string) => ({
    booksId: bookId,
    studentId: studentId,
    teacherId: teacherId,
  }));

  const borrowBookTransaction = await prisma.$transaction(async (prisma) => {
    const borrowBook = await prisma.borrowBook.createMany({
      data: borrowData,
    });

    for (const bookId of books) {
      await prisma.books.update({
        where: { id: bookId },
        data: {
          is_borrow_able: false,
        },
      });
    }

    return borrowBook;
  });

  return NextResponse.json(borrowBookTransaction, SUCCESS);
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const page: number = Number(searchParams.get("page")) || 1;
  const pageSize: number = Number(searchParams.get("pageSize")) || 10;
  const startDate: string = searchParams.get("startDate") || "";
  const endDate: string = searchParams.get("endDate") || "";

  if (!searchParams.get("page")) {
    const totalBorrowBook = await prisma.borrowBook.count({
      where: {
        is_returned: false,
      },
    });

    const borrowBook = await prisma.borrowBook.findMany({
      where: {
        is_returned: false,
      },
      include: {
        book_id: true,
        borrowed_by: true,
        created_by: true,
      },
    });

    const changedNameBorrowBook =
      borrowBook.length > 0
        ? borrowBook.map((borrow) => ({
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
      total: totalBorrowBook,
      list: changedNameBorrowBook,
    };

    return NextResponse.json(borrowBookRes, SUCCESS);
  }

  const pageNumber = page;
  const size = pageSize;

  const totalBorrowBook = await prisma.borrowBook.count({
    where: {
      created_date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });

  const borrowBook = await prisma.borrowBook.findMany({
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
      borrowed_by: true,
      created_by: true,
    },
  });

  const changedNameBorrowBook =
    borrowBook.length > 0
      ? borrowBook.map((borrow) => ({
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
    total: totalBorrowBook,
    page: pageNumber,
    pageSize: size,
    list: changedNameBorrowBook,
  };

  return NextResponse.json(borrowBookRes, SUCCESS);
}
