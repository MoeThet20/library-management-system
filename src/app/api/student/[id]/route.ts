import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { BAD_REQUEST, CONFLICT, NO_CONTENT, SUCCESS } from "@/const/status";

type ParamsProps = { params: { id: string } };

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const teacher = await prisma.student.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(teacher, SUCCESS);
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
  const data = await request.json();

  const { name, roleNumber, initialYear, currentYear, phoneNumber } = data;

  const findStudent = await prisma.student.findUnique({
    where: { initial_year: initialYear },
  });

  if (findStudent && params.id !== findStudent.id) {
    return NextResponse.json({ error: `${name} already exist` }, CONFLICT);
  }

  const student = await prisma.student.update({
    where: { id: params.id },
    data: {
      name,
      role_number: roleNumber,
      initial_year: initialYear,
      current_year: currentYear,
      phone_number: phoneNumber,
    },
  });

  return NextResponse.json(student, SUCCESS);
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  try {
    const { id } = params;
    await prisma.student.delete({ where: { id: id } });

    return NextResponse.json(NO_CONTENT);
  } catch (error: any) {
    if (error.code === "P2014") {
      return NextResponse.json(
        { error: "Can not delete, there is associated data" },
        BAD_REQUEST
      );
    }
  }
}
