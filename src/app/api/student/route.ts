import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
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
  const allSearch: string = searchParams.get("allSearch") || "false";

  const isAllSearch = allSearch == "true";

  const pageNumber = page;
  const size = pageSize;
  const searchTerm = search;

  const totalStudents = isAllSearch
    ? await prisma.student.count()
    : await prisma.student.count({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { phone_number: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
      });

  const students = isAllSearch
    ? await prisma.student.findMany({
        include: {
          created_by: true,
        },
      })
    : await prisma.student.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { phone_number: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        skip: (pageNumber - 1) * size,
        take: size,
        include: {
          created_by: true,
        },
      });

  const changedNameStudent =
    students.length > 0
      ? students.map((student) => ({
          id: student.id,
          name: student.name,
          roleNumber: student.role_number,
          phoneNumber: student.phone_number,
          currentYear: student.current_year,
          initialYear: student.initial_year,
          createdBy: student.created_by.name,
          createdDate: student.created_date,
        }))
      : [];

  const studentRes = {
    total: totalStudents,
    page: pageNumber,
    pageSize: size,
    list: changedNameStudent,
  };

  return NextResponse.json(studentRes, SUCCESS);
}
