import { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { type DefaultJWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { env } from "@/env/server.mjs";
import { whitelistedEmails } from "@/constants/whitelist";
import { decode } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      userId?: string | null;
      provider?: string | null;
      providerAccountId?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    username: string; // also my jwt will have the property, I can access this property within the JWT using the getToken() helper
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        return {
          id: profile.email,
          name: profile.email,
          username: profile.email,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    // session: async ({ session, user }) => {
    //   const account = await prisma.account.findFirst({
    //     where: {
    //       userId: user.id,
    //     },
    //   });

    //   if (account) {
    //     session.user.userId = account.userId;
    //     session.user.provider = account.provider;
    //     session.user.providerAccountId = account.providerAccountId;
    //   }

    //   return { ...session };
    // },
    signIn: async ({ user }) => {
      return (
        env.NODE_ENV !== "production" ||
        whitelistedEmails.includes(user.email ?? "")
      );
    },
  },
  secret: env.NEXTAUTH_SECRET ?? "",
  pages: {
    signIn: "/",
  },
};
