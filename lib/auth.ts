import NextAuth, { DefaultSession } from 'next-auth'
import authConfig from '@/auth.config'
import db from '@/drizzle'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { getUserById } from '@/lib/getData'

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
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
