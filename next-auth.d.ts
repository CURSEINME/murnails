import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string; // добавляем роль пользователя
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: string;
  }

  interface JWT {
    role?: string;
  }
}
