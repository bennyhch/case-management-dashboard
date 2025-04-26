import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const idFromUrl = url.pathname.split("/").pop(); // get the last part (the id)

  if (!idFromUrl) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const id = Number(idFromUrl);

  const task = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return NextResponse.json(task, { status: 200 });
}

export async function PATCH(req: Request) {
  const url = new URL(req.url);
  const idFromUrl = url.pathname.split("/").pop(); // get the last part (the id)

  if (!idFromUrl) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const id = Number(idFromUrl);

  const { status } = await req.json();

  if (!status) {
    return NextResponse.json({ error: "Status is required" }, { status: 400 });
  }

  const task = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: {
      status,
    },
  });

  return NextResponse.json(task, { status: 200 });
}
