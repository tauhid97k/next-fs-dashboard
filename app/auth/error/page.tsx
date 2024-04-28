import { Button } from '@/components/ui/button'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const AuthErrorPage = () => {
  return (
    <div className="w-full max-w-sm text-center">
      <div className="flex items-center justify-center gap-2 text-destructive text-lg mb-4">
        <ExclamationTriangleIcon className="size-5" />
        Something went wrong
      </div>
      <Button variant="secondary">
        <Link href="/auth/login">Go back to login</Link>
      </Button>
    </div>
  )
}

export default AuthErrorPage
