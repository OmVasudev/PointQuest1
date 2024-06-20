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
        email: { label: "Email", type: "email", placeholder: "user@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          const existingAdmin = await db.admin.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!existingAdmin) {
            console.error("Admin not found");
            return null;
          }

          const passwordMatch = await compare(
            credentials.password,
            existingAdmin.password
          );

          if (!passwordMatch) {
            console.error("Password does not match");
            return null;
          }

          console.log("Authorization successful for:", existingAdmin.email);
          return {
            id: existingAdmin.id,
            firstName: existingAdmin.firstName,
            lastName: existingAdmin.lastName,
            email: existingAdmin.email,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback - token:", token);
      console.log("JWT callback - user:", user);

      if (user) {
        return {
          ...token,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - session:", session);
      console.log("Session callback - token:", token);

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
