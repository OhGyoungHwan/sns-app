import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Read
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    const result = await prisma.like.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        post: {
          select: {
            id: true,
            category: true,
            title: true,
            content: true,
            videoId: true,
            userId: true,
            like: true,
            view: true,
            user: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(result);
  } else {
    return NextResponse.json({ error: "권한 오류" }, { status: 401 });
  }
}
