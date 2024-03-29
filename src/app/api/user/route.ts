import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Update
export async function PUT(req: NextRequest) {
  const { name }: { name: string } = await req.json();

  const session = await getServerSession(authOptions);
  if (session) {
    const result = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: name,
      },
    });
    return result
      ? NextResponse.json({ message: "성공" })
      : NextResponse.json({ error: "서버 오류" }, { status: 500 });
  } else {
    return NextResponse.json({ error: "권한 오류" }, { status: 401 });
  }
}
