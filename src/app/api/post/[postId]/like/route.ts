import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Read
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const session = await getServerSession(authOptions);
  if (session) {
    const result = await prisma.like.findFirst({
      where: {
        userId: session.user.id,
        postId: parseInt(params.postId),
      },
    });
    return result
      ? NextResponse.json({ isLike: true })
      : NextResponse.json({ isLike: false });
  } else {
    return NextResponse.json({ error: "권한 오류" }, { status: 401 });
  }
}
