'use server'

import { auth } from '@/lib/auth'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function resetPassword(_prevState: unknown, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid email address' }
  }

  const { email } = validatedFields.data

  try {
    await auth.api.forgetPassword({
      body: {
        redirectTo: "/update-password",
        email: email
      }
    })
  
  } catch {
    return { error: "Something went wrong" }
  }



  return { success: true }
}

