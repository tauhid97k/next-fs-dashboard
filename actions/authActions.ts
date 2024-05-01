'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
} from '@/validators'
import { db } from '@/lib/db'
import { validationErrorResponse } from '@/lib/validationErrorResponse'
import { getUserByEmail } from '@/lib/getData'
import { signIn, signOut } from '@/lib/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/auth.routes'
import { AuthError } from 'next-auth'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

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
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return {
    success: 'Confirmation email sent!',
  }
}

// Login
export const login = async (values: z.infer<typeof loginValidator>) => {
  const validatedFields = loginValidator.safeParse(values)
  if (!validatedFields.success) {
    return { validationError: validationErrorResponse(validatedFields.error) }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  // Check If User Exist
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Invalid credentials' }
  }

  // Check Password Matching
  const passwordMatch = await bcrypt.compare(password, existingUser.password)
  if (!passwordMatch) return { error: 'Invalid credentials' }

  // Check Email Verification (If not verified then send verification email)
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return {
      error: 'Check your email for verification',
    }
  }

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
