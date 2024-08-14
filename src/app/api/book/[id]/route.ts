import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NO_CONTENT, SUCCESS } from "@/const/status";

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
    isBorrowAble,
  } = data;

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
      is_borrow_able: isBorrowAble,
    },
  });

  return NextResponse.json(book, SUCCESS);
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  const { id } = params;

  await prisma.books.delete({ where: { id: id } });

  return NextResponse.json(NO_CONTENT);
}
