import NextAuth from "next-auth";

declare module "next-auth" {
  interface Student {
    email: string;
  }

  interface Session {
    user: Student & {
      email: string;
    };
    token: {
      email: string;
    };
  }
}
