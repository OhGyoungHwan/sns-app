import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export interface ILike {
  isLike: boolean;
}

// create
export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const session = await getServerSession(authOptions);

  const result = await prisma.like.create({
    data: {
      id: `${params.postId}${session?.user.id}`,
      post: { connect: { id: params.postId } },
      user: { connect: { id: session?.user.id } },
    },
  });
  return NextResponse.json(result);
}

// Read
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const isLike = await prisma.like.findFirst({
      where: {
        userId: session.user.id,
        postId: params.postId,
      },
    });
    return NextResponse.json({ isLike: isLike ? true : false });
  }

  return NextResponse.json({ isLike: false });
}

// Delete
export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const session = await getServerSession(authOptions);

  const result = await prisma.like.delete({
    where: {
      id: `${params.postId}${session?.user.id}`,
    },
  });
  return NextResponse.json(result);
}
