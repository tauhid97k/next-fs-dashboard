'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { forgotPasswordValidator } from '@/validators'

const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof forgotPasswordValidator>>({
    resolver: zodResolver(forgotPasswordValidator),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof forgotPasswordValidator>) => {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button className="w-full mb-4">Send password reset link</Button>
        <Link
          href="/login"
          className="block text-center text-sm text-muted-foreground hover:underline focus:underline focus:outline-none"
        >
          Go back to login?
        </Link>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm
