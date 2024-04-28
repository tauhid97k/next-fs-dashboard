import NextAuth, { DefaultSession } from 'next-auth'
import authConfig from '@/auth.config'
import db from '@/drizzle'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { getUserById } from '@/lib/getData'
import { users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

declare module 'next-auth' {
  interface Session {
    user: {
      role: 'ADMIN' | 'USER'
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async session({ token, session }) {
      // Add user id & role to session
      if (token.sub && token.role && session.user) {
        session.user.id = token.sub
        session.user.role = token.role as 'ADMIN' | 'USER'
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      // Check user
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      // Add role to token
      token.role = existingUser.role

      return token
    },
  },
  events: {
    async linkAccount({ user }) {
      await db
        .update(users)
        .set({
          emailVerified: new Date(),
        })
        .where(eq(users.id, user.id as string))
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
