import { AuthenticationCheck, authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Create
export async function POST(req: NextRequest) {
  const { postId, content }: { postId: number; content: string } =
    await req.json();

  const session = await getServerSession(authOptions);
  if (session) {
    const result = await prisma.comment.create({
      data: {
        content: content,
        user: { connect: { id: session.user.id } },
        post: { connect: { id: postId } },
      },
    });
    return result
      ? NextResponse.json({ message: "성공" })
      : NextResponse.json({ error: "서버 오류" }, { status: 500 });
  } else {
    return NextResponse.json({ error: "로그인 오류" }, { status: 401 });
  }
}

// Update
export async function PUT(req: NextRequest) {
  const { commentId, content }: { commentId: number; content: string } =
    await req.json();

  const authentication = await AuthenticationCheck("comment", commentId);

  if (authentication) {
    const result = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: content,
      },
    });
    return result
      ? NextResponse.json({ message: "성공" })
      : NextResponse.json({ error: "서버 오류" }, { status: 500 });
  } else {
    return NextResponse.json({ error: "권한 오류" }, { status: 401 });
  }
}

// Delete
export async function DELETE(req: NextRequest) {
  const { commentId }: { commentId: number } = await req.json();

  const authentication = await AuthenticationCheck("comment", commentId);

  if (authentication) {
    const result = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return result
      ? NextResponse.json({ message: "성공" })
      : NextResponse.json({ error: "서버 오류" }, { status: 500 });
  } else {
    return NextResponse.json({ error: "권한 오류" }, { status: 401 });
  }
}
