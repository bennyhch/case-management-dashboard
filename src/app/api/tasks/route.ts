import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const tasks = await prisma.task.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      dueDate: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const { title, description, status, dueDate } = await req.json();

  if (!title || !status || !dueDate) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      dueDate,
    },
  });

  return NextResponse.json(task, { status: 201 });
}
