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
    publicationDate,
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
      publication_date: publicationDate,
      amount,
      place,
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
  const allSearch: string = searchParams.get("allSearch") || "false";

  const isAllSearch = allSearch == "true";

  const pageNumber = page;
  const size = isAllSearch ? 50 : pageSize;
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
    include: {
      created_by: true,
    },
    orderBy: {
      created_date: "desc",
    },
  });

  const categories: Array<{
    id: String;
    category: String;
  }> = await prisma.category.findMany();

  function getCategoriesByIds(ids: Array<String>) {
    return categories
      .filter((item) => ids.includes(item.id))
      .map((item) => item.category);
  }

  const changedNameBooks =
    books.length > 0
      ? books.map((book) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          categories: getCategoriesByIds(book.categories),
          description: book.description,
          publicationDate: book.publication_date,
          amount: book.amount,
          place: book.place,
          isBorrowAble: book.is_borrow_able,
          createdBy: book.created_by.name,
          createdDate: book.created_date,
        }))
      : [];

  const booksRes = {
    total: totalBooks,
    page: pageNumber,
    pageSize: size,
    list: changedNameBooks,
  };

  return NextResponse.json(booksRes, SUCCESS);
}
