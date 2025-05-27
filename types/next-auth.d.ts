// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // 👈 ahora el campo "id" está disponible
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
