import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const departments = await prisma.department.findMany();
    return NextResponse.json(departments);
  } catch (error) {
    console.error("Failed to fetch departments", error);
    return NextResponse.json({ error: "Failed to fetch departments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, code, head } = body;

    const department = await prisma.department.create({
      data: {
        name,
        code,
        head,
      },
    });

    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    console.error("Failed to create department", error);
    return NextResponse.json({ error: "Failed to create department" }, { status: 500 });
  }
}
