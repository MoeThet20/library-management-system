import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CONFLICT, SUCCESS } from "@/const/status";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { name, roleNumber, initialYear, currentYear, phoneNumber, teacherId } =
    data;

  const findStudent = await prisma.student.findUnique({
    where: { initial_year: initialYear },
  });

  if (findStudent) {
    return NextResponse.json({ error: `${name} already exist` }, CONFLICT);
  }

  const student = await prisma.student.create({
    data: {
      name,
      role_number: roleNumber,
      initial_year: initialYear,
      current_year: currentYear,
      phone_number: phoneNumber,
      created_by: { connect: { id: teacherId } },
    },
  });

  return NextResponse.json(student, SUCCESS);
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

  const totalStudents = await prisma.student.count({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { phone_number: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
  });

  const students = await prisma.student.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { phone_number: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
    skip: (pageNumber - 1) * size,
    take: size,
  });

  const studentRes = {
    total: totalStudents,
    page: pageNumber,
    pageSize: size,
    list: students,
  };

  return NextResponse.json(studentRes, SUCCESS);
}
