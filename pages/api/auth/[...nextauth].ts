import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider  from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../prisma/client"

const adapter = PrismaAdapter(prisma)

export const authOptions:NextAuthOptions = {
    adapter: adapter,
    session: {strategy:'jwt'},
    secret : process.env.AUTH_SECRET,

    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID as any,
        clientSecret: process.env.GITHUB_SECRET as any,
      }),

      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "example@example.com", required: true },
          password: { label: "Password", type: "password", placeholder:"***", required: true }
        },
        async authorize(credentials, req) {
          const {email, password}:any = credentials;
          
          const user = await prisma.user.findUnique({
            where:{email: email}
          });
          if(user && user.password === password ){
            return user;
          }
          return null;
        }
      })
    ],

    
}

export default NextAuth(authOptions)