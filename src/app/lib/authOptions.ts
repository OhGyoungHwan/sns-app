import { AuthOptions, NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import prisma from "@/app/lib/prisma";

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
      return session;
    },
  },
};
