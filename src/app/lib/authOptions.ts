import { AuthOptions, NextAuthOptions, getServerSession } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import prisma from "@/app/lib/prisma";
import { TPrismaModel } from "../types/type";

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, token, user }) {
      session.user = user;
      return Promise.resolve({ ...session, redirect: "/my" });
    },
  },
};

export async function AuthenticationCheck(
  modalName?: TPrismaModel,
  modalId?: number
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return false;
  } else if (modalName) {
    switch (modalName) {
      case "like":
        const like = await prisma.like.findFirst({
          where: {
            id: `${modalId}-${session.user.id}`,
          },
        });
        return like ? true : false;
      case "post":
        const post = await prisma.post.findFirst({
          where: {
            id: modalId,
            userId: session.user.id,
          },
        });
        return post ? true : false;
      case "comment":
        const comment = await prisma.comment.findFirst({
          where: {
            id: modalId,
            userId: session.user.id,
          },
        });
        return comment ? true : false;
    }
  } else {
    return true;
  }
}
