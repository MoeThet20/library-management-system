import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CONFLICT, SUCCESS } from "@/const/status";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();
  const {
    title,
    author,
    isbn,
    categories,
    description,
    publication_date,
    amount,
    place,
    teacherId,
  } = data;

  const findBook = await prisma.books.findUnique({
    where: { isbn: isbn },
  });

  if (findBook) {
    return NextResponse.json({ error: "Book already exist" }, CONFLICT);
  }

  const book = await prisma.books.create({
    data: {
      title,
      author,
      isbn,
      categories,
      description,
      publication_date,
      amount,
      place,
      teacherId,
      is_borrow_able: true,
      created_by: { connect: { id: teacherId } },
    },
  });

  return NextResponse.json(book, SUCCESS);
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

  const totalBooks = await prisma.books.count({
    where: {
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { author: { contains: searchTerm, mode: "insensitive" } },
        { isbn: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
  });

  const books = await prisma.books.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { author: { contains: searchTerm, mode: "insensitive" } },
        { isbn: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
    skip: (pageNumber - 1) * size,
    take: size,
  });

  const booksRes = {
    total: totalBooks,
    page: pageNumber,
    pageSize: size,
    list: books,
  };

  return NextResponse.json(booksRes, SUCCESS);
}
