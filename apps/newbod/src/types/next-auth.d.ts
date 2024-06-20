import NextAuth from "next-auth";

declare module "next-auth" {
  interface BOD {
    email: string;
  }

  interface Session {
    user: BOD & {
      email: string;
    };
    token: {
      email: string;
    };
  }
}
