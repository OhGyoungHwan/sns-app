import { Category } from "@prisma/client";
import { Prisma } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

type PrismaModelOmit = "VerificationToken" | "Session" | "Account" | "User";
export type TPrismaModel = Lowercase<
  Exclude<Prisma.ModelName, PrismaModelOmit>
>;

export interface IComment {
  id: string;
  userId: string;
  postId: string;
  content: string;
}

export interface ICommentUser extends IComment {
  user: {
    id: string;
    name: string | null;
  };
}

export interface IPost {
  user: {
    id: string;
    name: string | null;
  } | null;
  title: string;
  id: number;
  category: Category;
  videoId: string;
  content: string;
  like: number;
  view: number;
}
