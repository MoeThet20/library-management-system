import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CONFLICT, SUCCESS } from "@/const/status";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { bookId, studentId, teacherId } = data;

  const returnBook = await prisma.returnBook.create({
    data: {
      book_id: { connect: { id: bookId } },
      return_by: { connect: { id: studentId } },
      created_by: { connect: { id: teacherId } },
    },
  });

  return NextResponse.json(returnBook, SUCCESS);
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
