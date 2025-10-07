import NextAuth from 'next-auth';

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log(credentials?.email, process.env.ADMIN_LOGIN)
        console.log(credentials?.password, process.env.ADMIN_PASS)
        if (

          (credentials?.email === process.env.ADMIN_LOGIN &&
            credentials?.password === process.env.ADMIN_PASS)
        ) {
          return { id: 'admin', name: 'Admin', role: 'admin' };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role as string;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
