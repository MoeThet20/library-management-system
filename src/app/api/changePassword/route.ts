import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { BAD_REQUEST, SUCCESS } from "@/const/status";
import bcrypt from "bcrypt";

const saltRounds = 10;
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { id, password, confirmPassword } = data;

  const teacher = await prisma.teacher.findUnique({
    where: { id: id },
  });

  if (!teacher) {
    return NextResponse.json({ error: "There is no teacher" }, BAD_REQUEST);
  }

  const isPasswordCorrect = await bcrypt.compare(password, teacher.password);

  if (!isPasswordCorrect) {
    return NextResponse.json({ error: "Invalid Password" }, BAD_REQUEST);
  }

  const hashedPassword = await bcrypt.hash(confirmPassword, saltRounds);

  const updatedTeacher = await prisma.teacher.update({
    where: { id: id },
    data: {
      password: hashedPassword,
    },
  });

  return NextResponse.json(updatedTeacher, SUCCESS);
}
