'use server'

import { z } from 'zod'
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
} from '@/validators'
import { formErrorServerResponse } from '@/lib/formErrorResponse'

// Register
export const register = async (values: z.infer<typeof registerValidator>) => {
  const validationResult = registerValidator.safeParse(values)
  if (!validationResult.success) {
    return { formError: formErrorServerResponse(validationResult.error) }
  }

  return {
    message: 'Registration successful',
  }
}

// Login
export const login = async (values: z.infer<typeof loginValidator>) => {
  const validationResult = loginValidator.safeParse(values)
  if (!validationResult.success) {
    return { formError: formErrorServerResponse(validationResult.error) }
  }

  return {
    message: 'Login successful',
  }
}

// Forgot Password
export const forgotPassword = async (
  values: z.infer<typeof forgotPasswordValidator>
) => {
  const validationResult = forgotPasswordValidator.safeParse(values)
  if (!validationResult.success) {
    return { formError: formErrorServerResponse(validationResult.error) }
  }

  return {
    message: 'Password reset link was sent',
  }
}
