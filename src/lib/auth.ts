import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/src/lib/prisma";
import authConfig from "@/auth.config";

const allowedEmails = [
    process.env.NEXT_PUBLIC_FIRST_USER_EMAIL,
    process.env.NEXT_PUBLIC_SECOND_USER_EMAIL,
]

export const {auth,handlers} = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET!,
    callbacks: {
        async signIn(user) {
            if (user?.profile?.email && allowedEmails.includes(user?.profile?.email)) {
                return true;
            } else {
                return false;
            }
        },
    },
    ...authConfig
})