import { api } from "@/http";

import type { NextAuthOptions } from "next-auth";

import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        username: { },
        password: { },
        authType: {}
      },
      async authorize(credentials) {
        const res = await api.post(`/${credentials?.authType}`, {
          username: credentials?.username,
          password: credentials?.password
        });

        const user = res.data.user;

        if (user) {
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
