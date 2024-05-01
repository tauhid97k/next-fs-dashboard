import { CheckCircledIcon } from '@radix-ui/react-icons'

interface FormSuccessProps {
  message?: string
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null

  return (
    <p className="bg-emerald-500/10 py-3 px-4 mb-4 rounded-md flex items-center gap-2 text-sm text-emerald-500">
      <CheckCircledIcon className="size-4 shrink-0" />
      <span>{message}</span>
    </p>
  )
}
