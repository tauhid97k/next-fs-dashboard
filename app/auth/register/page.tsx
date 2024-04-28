import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RegisterForm from '@/components/auth/register-form'
import SocialAuth from '@/components/auth/social-auth'

const RegisterPage = () => {
  return (
    <Card className="w-full max-w-sm bg-muted/40">
      <CardHeader>
        <CardTitle>Account Register</CardTitle>
      </CardHeader>
      <CardContent>
        <SocialAuth />
        <RegisterForm />
      </CardContent>
    </Card>
  )
}

export default RegisterPage
