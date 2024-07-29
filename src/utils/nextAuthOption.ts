import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { type: "text", placeholder: "test@test.com" },
        password: { type: "text", placeholder: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null;

        const { username, password } = credentials;

        try {
          const user = await prisma.user.findUnique({
            where: { username: username },
          });

          const isPasswordCorrect =
            user && (await bcrypt.compare(password, user.password));

          if (isPasswordCorrect) {
            return {
              id: user.id,
              name: user.name,
              username: user.username,
              role: user.role,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
