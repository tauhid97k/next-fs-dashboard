'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/auth.routes'

const SocialAuth = () => {
  const handleSocialAuth = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex w-full items-center gap-2 mb-4">
      <Button
        onClick={() => handleSocialAuth('google')}
        variant="outline"
        size="lg"
        className="w-full"
      >
        <FcGoogle className="icon" />
      </Button>
      <Button
        onClick={() => handleSocialAuth('github')}
        variant="outline"
        size="lg"
        className="w-full"
      >
        <FaGithub className="icon" />
      </Button>
    </div>
  )
}

export default SocialAuth
