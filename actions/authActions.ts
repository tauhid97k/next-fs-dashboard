'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
} from '@/validators'
import db from '@/drizzle'
import { validationErrorResponse } from '@/lib/validationErrorResponse'
import { getUserByEmail } from '@/lib/getData'
import { users } from '@/drizzle/schema'
import { signIn, signOut } from '@/lib/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/auth.routes'
import { AuthError } from 'next-auth'

// Register
export const register = async (values: z.infer<typeof registerValidator>) => {
  const validatedFields = registerValidator.safeParse(values)
  if (!validatedFields.success) {
    return { validationError: validationErrorResponse(validatedFields.error) }
  }

  // Get data and hash password
  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  // Check existing user
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already exist' }
  }

  // Save user
  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  })

  // TODO: Send verification token email

  return {
    message: 'Registration successful',
  }
}

// Login
export const login = async (values: z.infer<typeof loginValidator>) => {
  const validatedFields = loginValidator.safeParse(values)
  if (!validatedFields.success) {
    return { validationError: validationErrorResponse(validatedFields.error) }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }

    throw error
  }
}

// Forgot Password
export const forgotPassword = async (
  values: z.infer<typeof forgotPasswordValidator>
) => {
  const validatedFields = forgotPasswordValidator.safeParse(values)
  if (!validatedFields.success) {
    return { validationError: validationErrorResponse(validatedFields.error) }
  }

  return {
    message: 'Password reset link was sent',
  }
}

// Logout
export const logout = async () => {
  await signOut({ redirectTo: '/auth/login' })
}
