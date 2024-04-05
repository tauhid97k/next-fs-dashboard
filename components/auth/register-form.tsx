'use client'

import { z } from 'zod'
import { FieldPath, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerValidator } from '@/validators'
import { useTransition } from 'react'
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
import { register } from '@/actions/authActions'

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof registerValidator>>({
    resolver: zodResolver(registerValidator),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: z.infer<typeof registerValidator>) => {
    startTransition(async () => {
      const response = await register(values)
      if (response.formError) {
        response.formError.map(({ path, message }) => {
          form.setError(path as FieldPath<typeof values>, {
            message,
          })
        })
      } else {
        console.log(response.message)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <FormFieldSet disabled={isPending}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="name" placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              <FormItem className="mb-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mb-4">
            Register
          </Button>
          <Link
            href="/login"
            className="block text-center text-sm text-muted-foreground hover:underline focus:underline focus:outline-none"
          >
            Already have an account?
          </Link>
        </FormFieldSet>
      </form>
    </Form>
  )
}

export default RegisterForm
