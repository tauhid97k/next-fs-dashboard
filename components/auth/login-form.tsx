'use client'

import { z } from 'zod'
import { FieldPath, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginValidator } from '@/validators'
import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import FormFieldSet from '@/components/form-fieldset'
import { Input } from '@/components/ui/input'
import { login } from '@/actions/authActions'
import { FormError } from '@/components/form-error'
import { useSearchParams } from 'next/navigation'

const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState('')

  const form = useForm<z.infer<typeof loginValidator>>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginValidator>) => {
    startTransition(async () => {
      const response = await login(values)
      if (response?.validationError) {
        response.validationError.map(({ path, message }) => {
          form.setError(path as FieldPath<typeof values>, {
            message,
          })
        })
      } else if (response?.error) {
        setFormError(response.error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldSet disabled={isPending}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={formError || urlError} />
          <div className="flex flex-col md:flex-row justify-between gap-2 mb-4">
            <Link
              href="/auth/register"
              className="block text-center text-sm text-muted-foreground hover:underline focus:underline focus:outline-none"
            >
              Do not have an account?
            </Link>
            <Link
              href="/auth/forgot-password"
              className="block text-center text-sm text-muted-foreground hover:underline focus:underline focus:outline-none"
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" isLoading={isPending}>
            {isPending ? 'Logging in' : 'Login'}
          </Button>
        </FormFieldSet>
      </form>
    </Form>
  )
}

export default LoginForm
