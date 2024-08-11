import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SUCCESS } from "@/const/status";

type ParamsProps = { params: { id: string } };

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const teacher = await prisma.teacher.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(teacher, SUCCESS);
}

export async function PUT(request: NextRequest, { params }: ParamsProps) {
  const data = await request.json();

  const { name, password, rfid, phone_number, occupation } = data;

  const teacher = await prisma.teacher.update({
    where: { id: params.id },
    data: {
      name,
      password,
      rfid,
      phone_number,
      occupation,
    },
  });

  return NextResponse.json(teacher, SUCCESS);
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  const { id } = params;

  await prisma.teacher.delete({ where: { id: id } });

  return NextResponse.json({ message: "Teacher deleted" });
}
