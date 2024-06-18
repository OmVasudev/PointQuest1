import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@repo/db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "abc@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingStudent = await db.student.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!existingStudent) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingStudent.password
        );
        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingStudent.id,
          firstName: existingStudent.firstName,
          lastName: existingStudent.lastName,
          email: existingStudent.email,
        };
      },
    }),
  ],
};
