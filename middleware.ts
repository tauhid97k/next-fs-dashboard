import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isAuthenticated = Boolean(req.auth)
  // More codes here...
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
