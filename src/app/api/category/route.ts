import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CONFLICT, SUCCESS } from "@/const/status";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { category, teacherId } = data;

  const findCategory = await prisma.category.findUnique({
    where: { category: category },
  });

  if (findCategory) {
    return NextResponse.json({ error: "Category already exist" }, CONFLICT);
  }

  const categories = await prisma.category.create({
    data: {
      category: category,
      created_by: { connect: { id: teacherId } },
    },
  });

  return NextResponse.json(categories, SUCCESS);
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

  const totalCategories = await prisma.category.count({
    where: {
      OR: [{ category: { contains: searchTerm, mode: "insensitive" } }],
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      OR: [{ category: { contains: searchTerm, mode: "insensitive" } }],
    },
    skip: (pageNumber - 1) * size,
    take: size,
  });

  const categoriesRes = {
    total: totalCategories,
    page: pageNumber,
    pageSize: size,
    list: categories,
  };

  return NextResponse.json(categoriesRes, SUCCESS);
}
