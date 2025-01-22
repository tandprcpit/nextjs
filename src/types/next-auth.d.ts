// types/next-auth.d.ts
import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    _id: string;
    isVerified?: boolean;

    username?: string;
    isProfileComplete?: boolean;
    role?: string;
  }
  interface Session {
    user: {
      _id: string;
      isVerified?: boolean;
      username?: string;
      isProfileComplete?: boolean;
      role?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id: string;
    isVerified?: boolean;

    username?: string;
    isProfileComplete?: boolean;
    role?: string; 
  }
}
