import { ZodError } from 'zod'

// Form Validation Server Response
export const formErrorServerResponse = (validationErrors: ZodError) => {
  return validationErrors.issues.map(({ path, message }) => ({
    path: path.join('.'),
    message,
  }))
}
