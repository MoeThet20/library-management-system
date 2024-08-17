import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CONFLICT, NO_CONTENT, SUCCESS } from "@/const/status";

type ParamsProps = { params: { id: string } };

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const categories = await prisma.category.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(categories, SUCCESS);
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
  const data = await request.json();

  const { category } = data;

  const findCategory = await prisma.category.findUnique({
    where: { category: category.trim() },
  });

  if (findCategory) {
    return NextResponse.json({ error: "Category already exist" }, CONFLICT);
  }

  const categories = await prisma.category.update({
    where: { id: params.id },
    data: {
      category: category,
    },
  });

  return NextResponse.json(categories, SUCCESS);
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  const { id } = params;

  await prisma.category.delete({ where: { id: id } });

  return NextResponse.json(NO_CONTENT);
}
