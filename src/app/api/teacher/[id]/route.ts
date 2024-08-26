import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { BAD_REQUEST, CONFLICT, NO_CONTENT, SUCCESS } from "@/const/status";

type ParamsProps = { params: { id: string } };

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const teacher = await prisma.teacher.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(teacher, SUCCESS);
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
  const data = await request.json();

  const { name, email, rfid, phoneNumber, occupation } = data;

  const findTeacher = await prisma.teacher.findUnique({
    where: { email: email },
  });

  if (findTeacher && params.id !== findTeacher.id) {
    return NextResponse.json({ error: `${email} already exist` }, CONFLICT);
  }

  const teacher = await prisma.teacher.update({
    where: { id: params.id },
    data: {
      name,
      email,
      rfid,
      phone_number: phoneNumber,
      occupation,
    },
  });

  return NextResponse.json(teacher, SUCCESS);
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  try {
    const { id } = params;
    await prisma.teacher.delete({ where: { id: id } });

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
