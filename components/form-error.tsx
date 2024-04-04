import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface FormErrorProps {
  message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null

  return (
    <p className="bg-destructive/10 py-3 px-4 mb-4 rounded-md flex items-center gap-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="size-4" />
      <span>{message}</span>
    </p>
  )
}
