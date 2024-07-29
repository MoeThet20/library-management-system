import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      username?: string | null;
      role?: string | null;
    };
    expires: ISODateString;
  }
}
