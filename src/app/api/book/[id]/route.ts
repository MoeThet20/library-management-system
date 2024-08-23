import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CONFLICT, NO_CONTENT, SUCCESS } from "@/const/status";

type ParamsProps = { params: { id: string } };

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const book = await prisma.books.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(book, SUCCESS);
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
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

  if (findBook && params.id !== findBook.id) {
    return NextResponse.json({ error: "Book already exist" }, CONFLICT);
  }
  const book = await prisma.books.update({
    where: { id: params.id },
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
    },
  });

  return NextResponse.json(book, SUCCESS);
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  const { id } = params;

  await prisma.books.delete({ where: { id: id } });

  return NextResponse.json(NO_CONTENT);
}
