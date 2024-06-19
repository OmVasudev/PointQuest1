import NextAuth from "next-auth";

declare module "next-auth" {
  interface Admin {
    email: string;
  }

  interface Session {
    user: Admin & {
      email: string;
    };
    token: {
      email: string;
    };
  }
}
