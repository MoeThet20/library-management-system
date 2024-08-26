import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
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

  if (!searchParams.get("page")) {
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories, SUCCESS);
  }

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
    include: {
      created_by: true,
    },
    orderBy: {
      created_date: "desc",
    },
  });

  const changedNameCategories =
    categories.length > 0
      ? categories.map((category) => ({
          id: category.id,
          category: category.category,
          createdBy: category.created_by.name,
          createdDate: category.created_date,
        }))
      : [];

  const categoriesRes = {
    total: totalCategories,
    page: pageNumber,
    pageSize: size,
    list: changedNameCategories,
  };

  return NextResponse.json(categoriesRes, SUCCESS);
}
