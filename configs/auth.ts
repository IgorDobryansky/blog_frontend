import axios from "@/http";

import type { NextAuthOptions } from "next-auth";

import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        username: { label: "User name", type: "text", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials) {
        const res = await axios.post("/login", {
          username: credentials?.username,
          password: credentials?.password
        });

        const user = res.data.user;
        // If no error and we have user data, return it
        if (user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ user, token }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
};
