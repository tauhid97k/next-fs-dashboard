'use server'

import { z } from 'zod'
import bcrypt from 'bcrypt'
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
} from '@/validators'
import { validationErrorResponse } from '@/lib/validationErrorResponse'
import { users } from '@/drizzle/schema'
import db from '@/drizzle'

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
  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  })

  if (existingUser) {
    return { error: 'Email already exist' }
  }

  // Save user
  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  })

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

  return {
    message: 'Login successful',
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
