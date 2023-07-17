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
        console.log("credentials", credentials);
        const res = await axios.post(`/${credentials?.authType}`, {
          username: credentials?.username,
          password: credentials?.password
        });

        const user = res.data.user;

        if (user) {
          console.log(user);
          return user;
        }

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
    signIn: "/auth/login"
  }
};
