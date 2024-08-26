import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CONFLICT, SUCCESS } from "@/const/status";

const prisma = new PrismaClient();

const saltRounds = 10;

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, email, password, rfid, phoneNumber, occupation } = data;

  const findTeacher = await prisma.teacher.findUnique({
    where: { email: email },
  });

  if (findTeacher) {
    return NextResponse.json({ error: "Teacher already exist" }, CONFLICT);
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const teacher = await prisma.teacher.create({
    data: {
      name,
      email,
      password: hashedPassword,
      rfid,
      phone_number: phoneNumber,
      occupation,
    },
  });

  return NextResponse.json(teacher, SUCCESS);
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

  const totalTeachers = await prisma.teacher.count({
    where: {
      NOT: {
        email: {
          endsWith: "admin@gmail.com",
        },
      },
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { rfid: { contains: searchTerm, mode: "insensitive" } },
        { phone_number: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
  });

  const teachers = await prisma.teacher.findMany({
    where: {
      NOT: {
        email: {
          endsWith: "admin@gmail.com",
        },
      },
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { rfid: { contains: searchTerm, mode: "insensitive" } },
        { phone_number: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
    skip: (pageNumber - 1) * size,
    take: size,
    orderBy: {
      created_date: "desc",
    },
  });

  const changedNameTeachers =
    teachers.length > 0
      ? teachers.map((teacher) => ({
          id: teacher.id,
          email: teacher.email,
          name: teacher.name,
          occupation: teacher.occupation,
          rfid: teacher.rfid,
          createdDate: teacher.created_date,
          phoneNumber: teacher.phone_number,
        }))
      : [];

  const teachersRes = {
    total: totalTeachers,
    page: pageNumber,
    pageSize: size,
    list: changedNameTeachers,
  };

  return NextResponse.json(teachersRes, SUCCESS);
}
