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
        email: { type: "text", placeholder: "test@test.com" },
        password: { type: "text", placeholder: "password" },
        rfid: { type: "text", placeholder: "RFID" },
      },
      //@ts-ignore
      async authorize(credentials) {
        try {
          if (credentials?.rfid) {
            const user = await prisma.teacher.findUnique({
              where: { rfid: credentials?.rfid },
            });

            return {
              id: user?.id,
              name: user?.name,
              email: user?.email,
              occupation: user?.occupation,
              role: user?.role,
            };
          }

          if (!credentials?.email || !credentials.password) return null;

          const { email, password } = credentials;

          const user = await prisma.teacher.findUnique({
            where: { email: email },
          });

          const isPasswordCorrect =
            user && (await bcrypt.compare(password, user.password));

          if (isPasswordCorrect) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              occupation: user.occupation,
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
    maxAge: 1 * 1 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
