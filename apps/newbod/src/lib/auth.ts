import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@repo/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";

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
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const existingBOD = await db.bOD.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!existingBOD) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingBOD.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingBOD.id,
          firstName: existingBOD.firstName,
          lastName: existingBOD.lastName,
          email: existingBOD.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          email: token.email,
        },
      };
    },
  },
};
