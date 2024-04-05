'use client'

import { z } from 'zod'
import { FieldPath, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordValidator } from '@/validators'
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
import { forgotPassword } from '@/actions/authActions'

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof forgotPasswordValidator>>({
    resolver: zodResolver(forgotPasswordValidator),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof forgotPasswordValidator>) => {
    startTransition(async () => {
      const response = await forgotPassword(values)
      if (response.validationError) {
        response.validationError.map(({ path, message }) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldSet disabled={isPending}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mb-4">
            Send password reset link
          </Button>
          <Link
            href="/login"
            className="block text-center text-sm text-muted-foreground hover:underline focus:underline focus:outline-none"
          >
            Go back to login?
          </Link>
        </FormFieldSet>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm
