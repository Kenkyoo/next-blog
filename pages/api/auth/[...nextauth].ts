import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import { NextAuthOptions, Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma!),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, user }: { session: Session; user: AdapterUser }) {
      // Le agregamos el id al session.user
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
