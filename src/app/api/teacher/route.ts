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

  console.log(findTeacher);

  if (findTeacher) {
    return NextResponse.json({ error: "Teacher already exist" }, CONFLICT);
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // await prisma.teacher.delete({where: {id :'66b6ec011e2804dfebee8f4e' }})
  // const teacher = await prisma.teacher.create({
  //   data: {
  //     name: "Moe",
  //     email: "moe1@gmail.com",
  //     password: "123",
  //     rfid: "123@123",
  //     phone_number: "09969865124",
  //     occupation: "AssociateProfessor",
  //   },
  // });
  console.log({
    name,
    email,
    password: hashedPassword,
    rfid,
    phone_number: phoneNumber,
    occupation,
  });

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
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { rfid: { contains: searchTerm, mode: "insensitive" } },
        { phone_number: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
  });

  const teachers = await prisma.teacher.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { rfid: { contains: searchTerm, mode: "insensitive" } },
        { phone_number: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
    skip: (pageNumber - 1) * size,
    take: size,
  });

  const teachersRes = {
    total: totalTeachers,
    page: pageNumber,
    pageSize: size,
    teachers,
  };

  return NextResponse.json(teachersRes, SUCCESS);
}
